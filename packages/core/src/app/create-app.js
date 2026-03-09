 // packages/core/src/app/create-app.js

import { createRouterEngine } from "../router/router-engine.js"
import { createMiddlewareEngine } from "../middleware/middleware-engine.js"
import { createPluginEngine } from "../plugins/plugin-engine.js"

import { startRuntime } from "../runtime/start.js"

import { createAppInstance } from "./app-instance.js"

export function createApp(options = {}) {

  const router = createRouterEngine()

  const middleware = createMiddlewareEngine()

  const plugins = createPluginEngine({
    router,
    middleware,
    options
  })

  const runtime = {
    router,
    middleware,
    plugins,
    options
  }

  const app = createAppInstance(runtime)

  return app

}