import { Router } from "./index.ts"

const router = new Router("calculator", "0.1.0")

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

await router.run([])
await router.run(["add", "2", "2"])
await router.run(["mul", "-x", "3", "--y", "3"])
await router.run(["div", "2", "2"])
