// packages/core/src/backend/atlas/connectors/sqlite.js

import Database from "better-sqlite3"
import { log } from "../../../utils/logger.js"

class SQLiteConnector {

  constructor() {
    this.db = null
  }

  /**
   * Connect to SQLite
   */
  async connect(config = {}) {

    const file = config.file || "database.sqlite"

    try {

      this.db = new Database(file, {
        verbose: null
      })

      // enable foreign keys
      this.db.pragma("foreign_keys = ON")

      log(`Najumi Atlas connected to SQLite: ${file}`)

      return this

    } catch (error) {

      throw new Error("Failed to connect to SQLite database")

    }

  }

  /**
   * Execute raw query
   */
  async query(query, values = []) {

    try {

      const stmt = this.db.prepare(query)

      if (query.trim().toUpperCase().startsWith("SELECT")) {

        const rows = stmt.all(values)

        return { rows }

      }

      const result = stmt.run(values)

      return {
        rows: [],
        changes: result.changes,
        lastInsertRowid: result.lastInsertRowid
      }

    } catch (error) {

      log("SQLite query error:", error)

      throw new Error("SQLite query execution failed")

    }

  }

  /**
   * Create record
   */
  async create(model, data) {

    const keys = Object.keys(data)

    const columns = keys.map(k => `"${k}"`).join(", ")

    const placeholders = keys.map(() => "?").join(", ")

    const values = keys.map(k => data[k])

    const sql = `
      INSERT INTO "${model.name}" (${columns})
      VALUES (${placeholders})
    `

    const result = await this.query(sql, values)

    return {
      id: result.lastInsertRowid,
      ...data
    }

  }

  /**
   * Find many
   */
  async findMany(model, options = {}) {

    const where = options.where || {}

    const conditions = []
    const values = []

    for (const key of Object.keys(where)) {

      conditions.push(`"${key}" = ?`)
      values.push(where[key])

    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : ""

    const sql = `
      SELECT *
      FROM "${model.name}"
      ${whereClause}
    `

    const result = await this.query(sql, values)

    return result.rows

  }

  /**
   * Find one
   */
  async findOne(model, options = {}) {

    const rows = await this.findMany(model, options)

    return rows[0] || null

  }

  /**
   * Update record
   */
  async update(model, where = {}, data = {}) {

    const setParts = []
    const values = []

    for (const key of Object.keys(data)) {

      setParts.push(`"${key}" = ?`)
      values.push(data[key])

    }

    const whereParts = []

    for (const key of Object.keys(where)) {

      whereParts.push(`"${key}" = ?`)
      values.push(where[key])

    }

    const sql = `
      UPDATE "${model.name}"
      SET ${setParts.join(", ")}
      WHERE ${whereParts.join(" AND ")}
    `

    const result = await this.query(sql, values)

    return result.changes

  }

  /**
   * Delete record
   */
  async delete(model, where = {}) {

    const conditions = []
    const values = []

    for (const key of Object.keys(where)) {

      conditions.push(`"${key}" = ?`)
      values.push(where[key])

    }

    const sql = `
      DELETE FROM "${model.name}"
      WHERE ${conditions.join(" AND ")}
    `

    const result = await this.query(sql, values)

    return result.changes

  }

}

export function createConnector() {

  return new SQLiteConnector()

}