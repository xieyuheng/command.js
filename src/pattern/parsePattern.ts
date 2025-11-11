import { type Pattern } from "./Pattern.ts"

export function parsePattern(spec: string): Pattern {
  const argNames: Array<string> = []
  const optionNames: Array<string> = []

  const tokens = spec.split(" -- ")[0].split(" ")

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (!token.startsWith("-")) {
      argNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  while (tokens.length > 0) {
    const token = tokens.shift() as string
    if (token.startsWith("-")) {
      optionNames.push(token)
    } else {
      tokens.unshift(token)
      break
    }
  }

  return {
    argNames,
    optionNames,
    spec,
  }
}
