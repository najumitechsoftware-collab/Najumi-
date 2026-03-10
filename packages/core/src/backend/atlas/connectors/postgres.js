// packages/core/src/backend/atlas/connectors/postgres.js

import pkg from "pg"

const { Pool } = pkg

class PostgresConnector {

  constructor() {
    this.pool = null
  }

  /**
   * Connect to PostgreSQL
   */
  async connect(config) {

    const connectionString = config.url || process.env.DATABASE_URL

    if (!connectionString) {
      throw new Error("PostgreSQL connection URL is required")
    }

    this.pool = new Pool({
      connectionString,
      max: config.poolSize || 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })

    // test connection
    const client = await this.pool.connect()

    try {

      await client.query("SELECT 1")

      console.log("Najumi Atlas connected to PostgreSQL")

    } finally {

      client.release()

    }

    return this

  }

  /**
   * Execute query
   */
  async query(query, values = []) {

    const client = await this.pool.connect()

    try {

      const result = await client.query(query, values)

      return result

    } finally {

      client.release()

    }

  }

  /**
   * Insert record
   */
  async create(model, data) {

    const keys = Object.keys(data)

    const columns = keys.map(k => `"${k}"`).join(", ")

    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")

    const values = keys.map(k => data[k])

    const sql = `
      INSERT INTO "${model.name}" (${columns})
      VALUES (${placeholders})
      RETURNING *
    `

    const result = await this.query(sql, values)

    return result.rows[0]

  }

  /**
   * Find records
   */
  async findMany(model, options = {}) {

    const where = options.where || {}

    const conditions = []
    const values = []

    let index = 1

    for (const key of Object.keys(where)) {

      conditions.push(`"${key}" = $${index}`)
      values.push(where[key])

      index++

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
   * Find single record
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

    let index = 1

    for (const key of Object.keys(data)) {

      setParts.push(`"${key}" = $${index}`)
      values.push(data[key])

      index++

    }

    const whereParts = []

    for (const key of Object.keys(where)) {

      whereParts.push(`"${key}" = $${index}`)
      values.push(where[key])

      index++

    }

    const sql = `
      UPDATE "${model.name}"
      SET ${setParts.join(", ")}
      WHERE ${whereParts.join(" AND ")}
      RETURNING *
    `

    const result = await this.query(sql, values)

    return result.rows[0]

  }

  /**
   * Delete record
   */
  async delete(model, where = {}) {

    const conditions = []
    const values = []

    let index = 1

    for (const key of Object.keys(where)) {

      conditions.push(`"${key}" = $${index}`)
      values.push(where[key])

      index++

    }

    const sql = `
      DELETE FROM "${model.name}"
      WHERE ${conditions.join(" AND ")}
    `

    const result = await this.query(sql, values)

    return result.rowCount

  }

}

export function createConnector() {

  return new PostgresConnector()

}