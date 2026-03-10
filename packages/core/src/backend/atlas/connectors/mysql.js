// packages/core/src/backend/atlas/connectors/mysql.js

import mysql from "mysql2/promise"

class MySQLConnector {

  constructor() {
    this.pool = null
  }

  /**
   * Connect to MySQL
   */
  async connect(config) {

    if (!config.url && !config.host) {
      throw new Error("MySQL connection configuration required")
    }

    this.pool = mysql.createPool({

      uri: config.url,

      host: config.host,
      port: config.port || 3306,

      user: config.user,
      password: config.password,
      database: config.database,

      connectionLimit: config.poolSize || 10,

      waitForConnections: true,
      queueLimit: 0

    })

    const conn = await this.pool.getConnection()

    try {

      await conn.query("SELECT 1")

      console.log("Najumi Atlas connected to MySQL")

    } finally {

      conn.release()

    }

    return this

  }

  /**
   * Execute raw query
   */
  async query(query, values = []) {

    const conn = await this.pool.getConnection()

    try {

      const [rows] = await conn.execute(query, values)

      return {
        rows
      }

    } finally {

      conn.release()

    }

  }

  /**
   * Create record
   */
  async create(model, data) {

    const keys = Object.keys(data)

    const columns = keys.map(k => `\`${k}\``).join(", ")

    const placeholders = keys.map(() => "?").join(", ")

    const values = keys.map(k => data[k])

    const sql = `
      INSERT INTO \`${model.name}\` (${columns})
      VALUES (${placeholders})
    `

    const result = await this.query(sql, values)

    return result

  }

  /**
   * Find many
   */
  async findMany(model, options = {}) {

    const where = options.where || {}

    const conditions = []
    const values = []

    for (const key of Object.keys(where)) {

      conditions.push(`\`${key}\` = ?`)
      values.push(where[key])

    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : ""

    const sql = `
      SELECT *
      FROM \`${model.name}\`
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

      setParts.push(`\`${key}\` = ?`)
      values.push(data[key])

    }

    const whereParts = []

    for (const key of Object.keys(where)) {

      whereParts.push(`\`${key}\` = ?`)
      values.push(where[key])

    }

    const sql = `
      UPDATE \`${model.name}\`
      SET ${setParts.join(", ")}
      WHERE ${whereParts.join(" AND ")}
    `

    const result = await this.query(sql, values)

    return result

  }

  /**
   * Delete record
   */
  async delete(model, where = {}) {

    const conditions = []
    const values = []

    for (const key of Object.keys(where)) {

      conditions.push(`\`${key}\` = ?`)
      values.push(where[key])

    }

    const sql = `
      DELETE FROM \`${model.name}\`
      WHERE ${conditions.join(" AND ")}
    `

    const result = await this.query(sql, values)

    return result

  }

}

export function createConnector() {

  return new MySQLConnector()

}