export type MaybePromise<A> = Promise<A> | A

export type CommandHandlers = Record<
  string,
  (args: Array<string>, options: Record<string, string>) => MaybePromise<void>
>

export class CommandRouter {
  constructor() {}

  bind(routes: Record<string, string>, handlers: CommandHandlers) {
    //
  }

  run(argv: Array<string>) {
    console.log(argv)
  }
}
