import type { Pattern } from "./Pattern.ts"

export function matchPattern(
  pattern: Pattern,
  tokens: Array<string>,
): [args: Array<string>, options: Record<string, string>] {
  const args: Array<string> = []
  const options: Record<string, string> = {}
  for (const parameter of pattern.argNames) {
    const token = tokens.shift()
    if (token === undefined) {
      let message = `missing parameter: ${parameter}`
      throw new Error(message)
    }

    args.push(token)
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (!pattern.optionNames.includes(token)) {
      let message = `unknown command line token: ${token}`
      throw new Error(message)
    }

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

  return [args, options]
}
