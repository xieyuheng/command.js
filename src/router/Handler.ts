import type { MaybePromise } from "../helpers/promise/index.ts"
import type { Context } from "./Context.ts"
import { applyMiddleware, type Middleware } from "./Middleware.ts"

export type HandlerArgs = Array<any>
export type HandlerOptions = Record<string, any>

export type Handlers = Record<string, Handler>

export type Handler = HandlerFunction | HandlerObject

export type HandlerObject = {
  middleware: Middleware
  handler: Handler
}

export type HandlerFunction = (
  args: HandlerArgs,
  options: HandlerOptions,
  context: Context,
) => MaybePromise<void>

export function applyHandler(handler: Handler): HandlerFunction {
  if (handler instanceof Function) {
    return handler
  } else {
    return applyMiddleware(handler.middleware, applyHandler(handler.handler))
  }
}
