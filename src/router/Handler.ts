import type { MaybePromise } from "../helpers/promise/index.ts"
import type { Middleware } from "./Middleware.ts"

export type Handlers = Record<string, Handler>

export type Handler = HandlerFunction | HandlerObject

export type HandlerObject = {
  middleware: Middleware
  handler: Handler
}

export type HandlerFunction = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
) => MaybePromise<void>

export function applyHandler(handler: Handler): HandlerFunction {
  if (handler instanceof Function) {
    return handler
  } else {
    return applyHandler(handler.handler)
  }
}
