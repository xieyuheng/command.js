#!/usr/bin/env -S node

import { CommandRouter } from "./index.ts"

const router = new CommandRouter("calculator", "0.1.0")

const routes = {
  add: "x y -- add two numbers",
  mul: "-x --y -- mul two numbers",
}

router.bind(routes, {
  add: ([x, y]) => {
    console.log(Number(x) + Number(y))
  },
  mul: (args, options) => {
    console.log(Number(options["-x"]) * Number(options["--y"]))
  },
})

await router.run(process.argv)
