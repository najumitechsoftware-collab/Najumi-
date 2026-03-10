// packages/core/src/backend/atlas/query-engine/query-executor.js

import { log } from "../../../utils/logger.js"

class QueryExecutor {

  constructor(connector) {

    if (!connector) {
      throw new Error("QueryExecutor requires a database connector")
    }

    this.connector = connector

  }

  /**
   * Execute raw query
   */
  async execute(query, values = []) {

    try {

      const result = await this.connector.query(query, values)

      return result

    } catch (error) {

      log("Atlas query error:", error)

      throw new Error("Database query failed")

    }

  }

  /**
   * Execute INSERT
   */
  async insert(queryData) {

    const { query, values } = queryData

    const result = await this.execute(query, values)

    if (Array.isArray(result.rows)) {
      return result.rows[0]
    }

    return result

  }

  /**
   * Execute SELECT
   */
  async select(queryData) {

    const { query, values } = queryData

    const result = await this.execute(query, values)

    if (Array.isArray(result.rows)) {
      return result.rows
    }

    return result

  }

  /**
   * Execute UPDATE
   */
  async update(queryData) {

    const { query, values } = queryData

    const result = await this.execute(query, values)

    if (Array.isArray(result.rows)) {
      return result.rows[0]
    }

    return result

  }

  /**
   * Execute DELETE
   */
  async delete(queryData) {

    const { query, values } = queryData

    const result = await this.execute(query, values)

    return result

  }

}

export function createQueryExecutor(connector) {

  return new QueryExecutor(connector)

}