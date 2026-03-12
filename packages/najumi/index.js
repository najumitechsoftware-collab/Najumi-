/*
Najumi Framework
Public API Entry
*/

/*
Server API
*/

export { createServer } from "../core/src/server/api/server-api.js"

/*
Router API
*/

export {
createRouterEngine,
initRouter,
getRouter
} from "../core/src/router/router-engine.js"

/*
Middleware API
*/

export {
createMiddlewareEngine
} from "../core/src/middleware/middleware-engine.js"

/*
Backend API Engine
*/

export {
createApiEngine
} from "../core/src/backend/api/api-engine.js"

/*
Services
*/

export {
createServiceEngine
} from "../core/src/backend/services/service-engine.js"

/*
Authentication
*/

export {
createAuthEngine
} from "../core/src/backend/auth/auth-engine.js"

/*
Database (Atlas)
*/

export {
initAtlas
} from "../core/src/backend/atlas/atlas-engine.js"

/*
Cache (Pulse)
*/

export {
createCacheManager
} from "../core/src/cache/pulse/cache-manager.js"

/*
Queue (Orbit)
*/

export {
createOrbit
} from "../core/src/orbit/orbit-engine.js"

/*
Storage (Harbor)
*/

export {
createHarbor
} from "../core/src/storage/harbor/harbor-engine.js"

/*
Secrets (Vault)
*/

export {
initVault
} from "../core/src/security/vault/vault-engine.js"

/*
Frontend Framework
Najumi View
*/

export {
initComponentSystem,
getComponentSystem
} from "../frontend/src/view/component-system.js"

export {
getRenderEngine
} from "../frontend/src/view/render-engine.js"

export {
initState,
getState
} from "../frontend/src/view/state/state-engine.js"

export {
initRouter as initViewRouter
} from "../frontend/src/view/router/router-engine.js"

/*
Compiler (Najumi Forge)
*/

export {
compileView
} from "../frontend/src/view/compiler/view-compiler.js"

/*
Utilities
*/

export {
log
} from "../core/src/utils/logger.js"