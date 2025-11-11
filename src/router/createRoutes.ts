export function createRoutes(
  input: Record<string, string> | Array<string>,
): Record<string, string> {
  if (input instanceof Array) {
    return Object.fromEntries(
      input.map((line) => {
        const [head, ...rest] = line.split(" ")
        return [head, rest.join(" ")]
      }),
    )
  }

  return input
}
