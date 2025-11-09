export type Pattern = {
  parameters: Array<string>
  optionalParameters: Array<string>
  options: Record<string, string>
  optionalOptions: Record<string, string>
  description: string
}

export function createPattern(): Pattern {
  return {
    parameters: [],
    optionalParameters: [],
    options: {},
    optionalOptions: {},
    description: "",
  }
}
