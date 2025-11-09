#!/usr/bin/env -S node

import { CommandRouter } from "./index.ts"

const routes = {
  add: "x y -- add two numbers",
  mul: "x y -- mul two numbers",
}

const router = new CommandRouter(routes, {
  add: ([x, y]) => console.log(Number(x) + Number(y)),
  mul: ([x, y]) => console.log(Number(x) * Number(y)),
})

await router.run(process.argv)
