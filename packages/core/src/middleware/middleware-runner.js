// packages/core/src/middleware/middleware-runner.js

export async function runMiddlewareStack(stack, req, res) {

  let index = -1

  async function dispatch(i) {

    if (i <= index) {
      throw new Error("next() called multiple times")
    }

    index = i

    const middleware = stack[i]

    if (!middleware) {
      return true
    }

    let nextCalled = false

    const next = async () => {
      nextCalled = true
      return dispatch(i + 1)
    }

    const result = await middleware(req, res, next)

    if (result === false) {
      return false
    }

    if (!nextCalled) {
      return true
    }

  }

  return dispatch(0)

}