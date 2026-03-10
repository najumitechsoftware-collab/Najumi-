// packages/core/src/backend/atlas/index.js

import { createAtlasEngine } from "./atlas-engine.js"
import { loadModels } from "./model-system/model-loader.js"
import { createMigrationEngine } from "./migration-system/migration-engine.js"

let atlasInstance = null

/**
 * Initialize Atlas
 */
export async function initAtlas(config = {}) {

  if (atlasInstance) {
    return atlasInstance
  }

  const atlas = createAtlasEngine()

  await atlas.connect(config.database)

  await loadModels(atlas)

  const migrationEngine = createMigrationEngine(atlas.connector)

  await migrationEngine.migrate()

  atlasInstance = atlas

  return atlas

}

/**
 * Get Atlas instance
 */
export function getAtlas() {

  if (!atlasInstance) {
    throw new Error("Atlas not initialized")
  }

  return atlasInstance

}