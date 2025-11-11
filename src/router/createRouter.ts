import { Router } from "./Router.ts"

export function createRouter(name: string, version: string): Router {
  return new Router(name, version)
}
