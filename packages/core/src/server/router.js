// packages/core/src/server/router.js

export function createRouter() {

  const routes = []

  function add(method, path, handler) {
    routes.push({ method, path, handler })
  }

  async function handle(req, res) {

    const { url, method } = req

    for (const route of routes) {

      if (route.method === method && route.path === url) {

        await route.handler(req, res)

        return true

      }

    }

    return false

  }

  return {
    add,
    handle
  }

}