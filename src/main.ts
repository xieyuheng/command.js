#!/usr/bin/env -S node

import { CommandRouter, type CommandHandlers } from "./index.ts"

const router = new CommandRouter()

const routes = {
  add: "x y -- add two numbers",
  mul: "x y -- mul two numbers",
}

const handlers: CommandHandlers = {
  add: ([x, y]) => console.log(Number(x) + Number(y)),
  mul: ([x, y]) => console.log(Number(x) * Number(y)),
}

router.bind(routes, handlers)
router.run(process.argv)
