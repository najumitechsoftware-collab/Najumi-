// packages/core/src/backend/atlas/connectors/mongodb.js

import { MongoClient } from "mongodb"
import { log } from "../../../utils/logger.js"

class MongoConnector {

  constructor() {
    this.client = null
    this.db = null
  }

  /**
   * Connect to MongoDB
   */
  async connect(config = {}) {

    const url = config.url || process.env.MONGODB_URL

    if (!url) {
      throw new Error("MongoDB connection URL required")
    }

    const dbName = config.database || "najumi"

    try {

      this.client = new MongoClient(url, {
        maxPoolSize: config.poolSize || 10
      })

      await this.client.connect()

      this.db = this.client.db(dbName)

      log(`Najumi Atlas connected to MongoDB (${dbName})`)

      return this

    } catch (error) {

      throw new Error("Failed to connect to MongoDB")

    }

  }

  /**
   * Get collection
   */
  getCollection(model) {

    if (!this.db) {
      throw new Error("MongoDB not connected")
    }

    return this.db.collection(model.name)

  }

  /**
   * Execute raw query (limited support)
   */
  async query() {

    throw new Error("Raw SQL queries are not supported in MongoDB connector")

  }

  /**
   * Create document
   */
  async create(model, data) {

    const collection = this.getCollection(model)

    const result = await collection.insertOne(data)

    return {
      id: result.insertedId,
      ...data
    }

  }

  /**
   * Find many documents
   */
  async findMany(model, options = {}) {

    const collection = this.getCollection(model)

    const where = options.where || {}

    const docs = await collection
      .find(where)
      .toArray()

    return docs

  }

  /**
   * Find single document
   */
  async findOne(model, options = {}) {

    const collection = this.getCollection(model)

    const where = options.where || {}

    const doc = await collection.findOne(where)

    return doc

  }

  /**
   * Update document
   */
  async update(model, where = {}, data = {}) {

    const collection = this.getCollection(model)

    const result = await collection.updateMany(
      where,
      { $set: data }
    )

    return result.modifiedCount

  }

  /**
   * Delete document
   */
  async delete(model, where = {}) {

    const collection = this.getCollection(model)

    const result = await collection.deleteMany(where)

    return result.deletedCount

  }

}

export function createConnector() {

  return new MongoConnector()

}