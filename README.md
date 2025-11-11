# command.js

A simple library for building CLI with sub-commands in Node.js.

## Usage

```typescript
import * as cmd from "@xieyuheng/command.js"

const router = cmd.createRouter("calculator", "0.1.0")

const routes = [
  "add x y -- add two numbers and print the result",
  "mul --x --y -- mul two numbers and print the result",
]

router.bind(routes, {
  add: ([x, y]) => {
    console.log(Number(x) + Number(y))
  },
  mul: (args, options) => {
    console.log(Number(options["--x"]) * Number(options["--y"]))
  },
})

await router.run(["add", "2", "2"])
await router.run(["mul", "--x", "3", "--y", "3"])
```

## License

[GPLv3](LICENSE)
