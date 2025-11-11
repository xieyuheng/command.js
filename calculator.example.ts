import * as Cmd from "./src/index.ts"

function logger(): Cmd.Middleware {
  return (args, options, context, continuation) => {
    const command = context.route.command
    console.log({ command, args, options  })
    return continuation(args, options, context)
  }
}

const router = Cmd.createRouter("calculator", "0.1.0", {
  middleware: [logger()],
})

router.defineRoutes([
  "add x y -- secretly double the args",
  "mul --x --y",
])

function doubleArgs(): Cmd.Middleware {
  return (args, options, context, continuation) => {
    args = args.map((arg) => String(Number(arg) * 2))
    return continuation(args, options, context)
  }
}

router.defineHandlers({
  add: {
    middleware: [doubleArgs()],
    handler([x, y]) {
      console.log(Number(x) + Number(y))
    },
  },
  mul: (args, options) => {
    console.log(Number(options["--x"]) * Number(options["--y"]))
  },
})

try {
  await router.run(process.argv.slice(2))
} catch(error) {
  console.log(error)
  process.exit(1)
}
