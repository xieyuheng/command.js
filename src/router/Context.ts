import type { Route } from "./Route.ts"
import type { Router } from "./Router.ts"

export type Context = {
  router: Router
  route: Route
  tokens: Array<string>
}
