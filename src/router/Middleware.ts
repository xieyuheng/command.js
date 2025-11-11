import type { MaybePromise } from "../helpers/promise/index.ts"
import type { Context } from "./Context.ts"
import type { HandlerArgs, HandlerFunction, HandlerOptions } from "./Handler.ts"

export type Middleware = MiddlewareArray | MiddlewareFunction

export type MiddlewareArray = Array<Middleware>

export type MiddlewareFunction = (
  args: HandlerArgs,
  options: HandlerOptions,
  context: Context,
  continuation: HandlerFunction,
) => MaybePromise<void>

export function applyMiddleware(
  middleware: Middleware,
  continuation: HandlerFunction,
): HandlerFunction {
  if (middleware instanceof Function) {
    return (args, options, context) =>
      middleware(args, options, context, continuation)
  } else {
    if (middleware.length === 0) {
      return continuation
    }

    const [head, ...rest] = middleware
    return applyMiddleware(head, applyMiddleware(rest, continuation))
  }
}
