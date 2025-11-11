import { type Handlers } from "./Handler.ts"
import { parseRoute, routeMatch, type Route } from "./Route.ts"

export function createRouter(name: string, version: string): Router {
  return new Router(name, version)
}

export class Router {
  name: string
  version: string

  routes: Record<string, Route> = {}
  handlers: Handlers = {}

  constructor(name: string, version: string) {
    this.name = name
    this.version = version
  }

  defineRoutes(commands: Array<string>): void {
    for (const route of commands.map(parseRoute)) {
      this.routes[route.name] = route
    }
  }

  defineHandlers(handlers: Handlers): void {
    this.handlers = { ...this.handlers, ...handlers }
  }

  async run(argv: Array<string>): Promise<void> {
    const [name, ...tokens] = argv
    if (name === undefined) {
      this.printNameAndVersion()
      this.printCommands()
      return
    }

    const route = this.routes[name]
    if (route === undefined) {
      this.printNameAndVersion()
      console.log(`unknown command: ${name}`)
      this.printCommands()
      return
    }

    const [args, options] = routeMatch(route, tokens)
    const handler = this.handlers[name]
    await handler(args, options, tokens)
  }

  printNameAndVersion() {
    console.log(`${this.name} ${this.version}`)
  }

  printCommands() {
    console.log(`commands:`)
    for (const route of Object.values(this.routes))
      console.log(`  ${route.command}`)
  }
}
