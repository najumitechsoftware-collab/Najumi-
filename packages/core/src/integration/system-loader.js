// packages/core/src/integration/system-loader.js

import { log } from "../utils/logger.js"

// Vault
import { initVault } from "../security/vault/vault-engine.js"

// Atlas (Database)
import { initAtlas } from "../backend/atlas/index.js"

// Pulse (Cache)
import { initPulse } from "../cache/pulse/pulse-engine.js"

// Orbit (Queue)
import { initOrbit } from "../orbit/orbit-engine.js"

// Harbor (Storage)
import { initHarbor } from "../storage/harbor/harbor-engine.js"
import { initLocalDriver } from "../storage/harbor/drivers/local-driver.js"

export async function loadSystems(config = {}, container) {

  log("Initializing Najumi core systems...")

  /*
  VAULT
  */
  const vault = initVault(config.vault || {})

  container.register("vault", vault)

  log("Vault initialized")

  /*
  ATLAS (DATABASE)
  */
  const atlas = await initAtlas(config.database || {})

  container.register("atlas", atlas)

  log("Atlas database initialized")

  /*
  PULSE (CACHE)
  */
  const pulse = initPulse(config.cache || {})

  container.register("pulse", pulse)

  log("Pulse cache initialized")

  /*
  ORBIT (QUEUE)
  */
  const orbit = initOrbit(config.queue || {})

  container.register("orbit", orbit)

  log("Orbit queue initialized")

  /*
  HARBOR (STORAGE)
  */
  const harbor = initHarbor(config.storage || {})

  const localDriver = initLocalDriver(config.storage || {})

  harbor.registerDriver("local", localDriver)

  container.register("harbor", harbor)

  log("Harbor storage initialized")

  /*
  SYSTEM REGISTRY
  */

  const systems = {
    vault,
    atlas,
    pulse,
    orbit,
    harbor
  }

  container.register("systems", systems)

  log("Najumi systems loaded successfully")

  return systems

}