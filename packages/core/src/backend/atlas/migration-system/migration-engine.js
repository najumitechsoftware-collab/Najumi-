// packages/core/src/backend/atlas/migration-system/migration-engine.js

import fs from "fs/promises"
import path from "path"
import { log } from "../../../utils/logger.js"

class MigrationEngine {

  constructor(connector) {

    if (!connector) {
      throw new Error("MigrationEngine requires a database connector")
    }

    this.connector = connector

  }

  /**
   * Ensure migrations table exists
   */
  async ensureMigrationTable() {

    const sql = `
      CREATE TABLE IF NOT EXISTS najumi_migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await this.connector.query(sql)

  }

  /**
   * Get executed migrations
   */
  async getExecutedMigrations() {

    const sql = `
      SELECT name FROM najumi_migrations
      ORDER BY id ASC
    `

    const result = await this.connector.query(sql)

    return result.rows.map(row => row.name)

  }

  /**
   * Record executed migration
   */
  async recordMigration(name) {

    const sql = `
      INSERT INTO najumi_migrations (name)
      VALUES ($1)
    `

    await this.connector.query(sql, [name])

  }

  /**
   * Load migration files
   */
  async loadMigrationFiles(rootDir = process.cwd()) {

    const migrationsDir = path.join(rootDir, "migrations")

    const exists = await fs.stat(migrationsDir)
      .then(() => true)
      .catch(() => false)

    if (!exists) {
      return []
    }

    const files = await fs.readdir(migrationsDir)

    return files
      .filter(f => f.endsWith(".js"))
      .sort()

  }

  /**
   * Run migrations
   */
  async migrate(rootDir = process.cwd()) {

    await this.ensureMigrationTable()

    const executed = await this.getExecutedMigrations()

    const files = await this.loadMigrationFiles(rootDir)

    for (const file of files) {

      if (executed.includes(file)) {
        continue
      }

      const filePath = path.join(rootDir, "migrations", file)

      log(`Running migration: ${file}`)

      const migrationModule = await import(filePath)

      const migration = migrationModule.default || migrationModule

      if (typeof migration.up !== "function") {
        throw new Error(`Migration ${file} must export an 'up' function`)
      }

      await migration.up(this.connector)

      await this.recordMigration(file)

      log(`Migration completed: ${file}`)

    }

  }

}

export function createMigrationEngine(connector) {

  return new MigrationEngine(connector)

}