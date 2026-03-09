// packages/core/src/app/app-instance.js

import { startRuntime } from "../runtime/start.js"
import { startDevServer } from "../server/dev-server.js"

export function createAppInstance(runtime) {

  const { router, middleware, plugins, options } = runtime

  const modules = new Map()

  const app = {

    // -------------------------
    // ROUTES
    // -------------------------

    get(path, handler) {
      router.get(path, handler)
      return app
    },

    post(path, handler) {
      router.post(path, handler)
      return app
    },

    put(path, handler) {
      router.put(path, handler)
      return app
    },

    delete(path, handler) {
      router.delete(path, handler)
      return app
    },

    // -------------------------
    // MIDDLEWARE
    // -------------------------

    use(fn) {
      middleware.use(fn)
      return app
    },

    // -------------------------
    // PLUGINS
    // -------------------------

    plugin(pluginFn) {
      plugins.register(pluginFn)
      return app
    },

    // -------------------------
    // MODULES
    // -------------------------

    module(name, moduleInstance) {

      if (modules.has(name)) {
        throw new Error(`Module already registered: ${name}`)
      }

      modules.set(name, moduleInstance)

      return app

    },

    // -------------------------
    // START SERVER
    // -------------------------

    async start() {

      const config = options.config || {}

      // start runtime engine
      const runtimeState = await startRuntime(config, modules)

      // run plugins
      await plugins.run()

      // start server
      await startDevServer(config)

      return runtimeState

    }

  }

  return app

}