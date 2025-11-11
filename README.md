# command.js

A simple library for building CLI with sub-commands in Node.js.

## Example

```sh
node calculator.example.ts
```

```typescript
import * as Cmd from "./src/index.ts"

function logger(): Cmd.Middleware {
  return (args, options, tokens, continuation) => {
    console.log({ args, options, tokens })
    return continuation(args, options, tokens)
  }
}

const router = Cmd.createRouter("calculator", "0.1.0", {
  middleware: [logger()],
})

router.defineRoutes([
  "add x y -- add two numbers (secretly double them) and print the result",
  "mul --x --y -- mul two numbers and print the result",
])

function doubleArgs(): Cmd.Middleware {
  return (args, options, tokens, continuation) => {
    args = args.map((arg) => String(Number(arg) * 2))
    return continuation(args, options, tokens)
  }
}

router.defineHandlers({
  add: {
    middleware: [doubleArgs()],
    handler([x, y]) {
      console.log(Number(x) + Number(y))
    },
  },
  mul(args, options) {
    console.log(Number(options["--x"]) * Number(options["--y"]))
  },
})

try {
  await router.run(process.argv.slice(2))
} catch(error) {
  console.log(error)
  process.exit(1)
}
```

## License

[GPLv3](LICENSE)
