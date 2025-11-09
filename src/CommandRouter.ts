import type { MaybePromise } from "./helpers/promise/index.ts"
import { recordMapValue } from "./helpers/record/recordMapValue.ts"
import { createPattern, type Pattern } from "./Pattern.ts"

export type CommandHandlers = Record<
  string,
  (args: Array<string>, options: Record<string, string>) => MaybePromise<void>
>

export class CommandRouter {
  patterns: Record<string, Pattern>
  handlers: CommandHandlers

  constructor(inputRoutes: Record<string, string>, handlers: CommandHandlers) {
    this.patterns = recordMapValue(inputRoutes, parsePattern)
    this.handlers = handlers
  }

  async run(argv: Array<string>) {
    const [_interpreter, _script, name, ...restInput] = argv
    const pattern = this.patterns[name]
    if (pattern === undefined) {
      let message = `unknown command`
      message += `\n  command name: ${name}`
      throw new Error(message)
    }

    const [args, options] = matchPattern(pattern, restInput)
    const handler = this.handlers[name]
    if (handler === undefined) {
      let message = `no handler for command`
      message += `\n  command name: ${name}`
      throw new Error(message)
    }

    await handler(args, options)
  }
}

export function parsePattern(input: string): Pattern {
  const pattern = createPattern()
  // TODO
  return pattern
}

export function matchPattern(
  pattern: Pattern,
  input: Array<string>,
): [args: Array<string>, options: Record<string, string>] {
  const args: Array<string> = []
  const options: Record<string, string> = {}
  // TODO
  return [args, options]
}
