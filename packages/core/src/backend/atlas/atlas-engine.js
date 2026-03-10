// packages/core/src/backend/atlas/atlas-engine.js

import { log } from "../../utils/logger.js"

class AtlasEngine {

  constructor() {

    this.connector = null
    this.models = new Map()
    this.connection = null

  }

  /**
   * Connect to database
   */
  async connect(config) {

    if (!config || !config.provider) {
      throw new Error("Atlas requires database provider")
    }

    const provider = config.provider.toLowerCase()

    let connectorModule

    switch (provider) {

      case "postgres":
        connectorModule = await import("./connectors/postgres.js")
        break

      case "mysql":
        connectorModule = await import("./connectors/mysql.js")
        break

      case "sqlite":
        connectorModule = await import("./connectors/sqlite.js")
        break

      case "mongodb":
        connectorModule = await import("./connectors/mongodb.js")
        break

      default:
        throw new Error(`Unsupported database provider: ${provider}`)

    }

    this.connector = connectorModule.createConnector()

    this.connection = await this.connector.connect(config)

    log(`Atlas connected to ${provider}`)

  }

  /**
   * Register model
   */
  registerModel(model) {

    if (!model.name) {
      throw new Error("Model must have a name")
    }

    const modelName = model.name

    this.models.set(modelName, model)

    // create model API
    this[modelName] = {

      create: (data) => this.create(modelName, data),

      findMany: (query = {}) => this.findMany(modelName, query),

      findOne: (query = {}) => this.findOne(modelName, query),

      update: (query, data) => this.update(modelName, query, data),

      delete: (query) => this.delete(modelName, query)

    }

    log(`Atlas model registered: ${modelName}`)

  }

  /**
   * Create record
   */
  async create(modelName, data) {

    const model = this.models.get(modelName)

    if (!model) {
      throw new Error(`Model not found: ${modelName}`)
    }

    return this.connector.create(model, data)

  }

  /**
   * Find many records
   */
  async findMany(modelName, query = {}) {

    const model = this.models.get(modelName)

    if (!model) {
      throw new Error(`Model not found: ${modelName}`)
    }

    return this.connector.findMany(model, query)

  }

  /**
   * Find single record
   */
  async findOne(modelName, query = {}) {

    const model = this.models.get(modelName)

    if (!model) {
      throw new Error(`Model not found: ${modelName}`)
    }

    return this.connector.findOne(model, query)

  }

  /**
   * Update record
   */
  async update(modelName, query, data) {

    const model = this.models.get(modelName)

    if (!model) {
      throw new Error(`Model not found: ${modelName}`)
    }

    return this.connector.update(model, query, data)

  }

  /**
   * Delete record
   */
  async delete(modelName, query) {

    const model = this.models.get(modelName)

    if (!model) {
      throw new Error(`Model not found: ${modelName}`)
    }

    return this.connector.delete(model, query)

  }

  /**
   * List models
   */
  listModels() {

    return Array.from(this.models.keys())

  }

}

export function createAtlasEngine() {

  return new AtlasEngine()

}