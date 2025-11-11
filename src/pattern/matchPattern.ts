import type { Pattern } from "./Pattern.ts"

export function matchPattern(
  pattern: Pattern,
  inputTokens: Array<string>,
): [args: Array<string>, options: Record<string, string>] {
  const tokens = [...inputTokens]
  const args: Array<string> = []
  const options: Record<string, string> = {}
  for (const argName of pattern.argNames) {
    const token = tokens.shift()
    if (token === undefined) {
      let message = `[Router] ${pattern.spec}`
      message += `\n  input tokens: ${inputTokens.join(" ")}`
      message += `\n  missing argument: ${argName}`
      console.log(message)
      process.exit(1)
    }

    args.push(token)
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (pattern.optionNames.includes(token)) {
      const nextToken = tokens.shift()
      if (nextToken === undefined) {
        options[token] = ""
      } else if (nextToken.startsWith("-")) {
        tokens.unshift(nextToken)
        options[token] = ""
      } else {
        options[token] = nextToken
      }
    }
  }

  return [args, options]
}
