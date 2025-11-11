import type { MaybePromise } from "../helpers/promise/index.ts"

export type Handler = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
) => MaybePromise<void>

export type Handlers = Record<string, Handler>

export type Middleware = MiddlewareArray | MiddlewareFunction

export type MiddlewareArray = Array<Middleware>

export type MiddlewareFunction = (
  args: Array<string>,
  options: Record<string, string>,
  tokens: Array<string>,
  continuation: Handler,
) => void
