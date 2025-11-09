export type ArgumentPattern = {
  parameters: Array<string>
  optionalParameters: Array<string>
  options: Record<string, string>
  optionalOptions: Record<string, string>
  description: string
}
