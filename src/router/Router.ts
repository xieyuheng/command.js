import { recordMapValue } from "../helpers/record/recordMapValue.ts"
import { setDifference } from "../helpers/set/setAlgebra.ts"
import { matchPattern, parsePattern, type Pattern } from "../pattern/index.ts"
import { createRoutes } from "./createRoutes.ts"
import { type Handlers } from "./Handler.ts"

export class Router {
  name: string
  version: string

  specs: Record<string, string> = {}
  patterns: Record<string, Pattern> = {}
  handlers: Handlers = {}

  constructor(name: string, version: string) {
    this.name = name
    this.version = version
  }

  bind(
    input: Record<string, string> | Array<string>,
    handlers: Handlers,
  ): void {
    const specs = createRoutes(input)

    checkHandlers(specs, handlers)

    this.specs = { ...this.specs, ...specs }
    const patterns = recordMapValue(specs, parsePattern)
    this.patterns = { ...this.patterns, ...patterns }
    this.handlers = { ...this.handlers, ...handlers }
  }

  async run(argv: Array<string>): Promise<void> {
    const [name, ...tokens] = argv
    if (name === undefined) {
      this.printNameAndVersion()
      this.printCommands()
      return
    }

    const pattern = this.patterns[name]
    if (pattern === undefined) {
      this.printNameAndVersion()
      console.log(`unknown command: ${name}`)
      this.printCommands()
      return
    }

    const [args, options] = matchPattern(pattern, tokens)
    const handler = this.handlers[name]
    await handler(args, options, tokens)
  }

  printNameAndVersion() {
    console.log(`${this.name} ${this.version}`)
  }

  printCommands() {
    console.log(`commands:`)
    for (const [name, spec] of Object.entries(this.specs))
      console.log(`  ${name} ${spec}`)
  }
}

function checkHandlers(
  specs: Record<string, string>,
  handlers: Handlers,
): void {
  const specNames = Object.keys(specs)
  const handlerNames = Object.keys(handlers)
  const missingHandlerNames = Array.from(
    setDifference(new Set(specNames), new Set(handlerNames)),
  )
  const missingSpecNames = Array.from(
    setDifference(new Set(handlerNames), new Set(specNames)),
  )
  if (missingHandlerNames.length !== 0 || missingSpecNames.length !== 0) {
    let message = `[Router.bind] handler mismatch`
    if (missingHandlerNames.length !== 0)
      message += `\n  missing handler names: ${missingHandlerNames.join(" ")}`
    if (missingSpecNames.length !== 0)
      message += `\n  missing spec names: ${missingSpecNames.join(" ")}`
    console.log(message)
    process.exit(1)
  }
}
