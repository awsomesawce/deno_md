#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write
import * as fs from "$std/fs/mod.ts"
import * as path from "$std/path/mod.ts"
import * as yaml from "$std/yaml/mod.ts"
import * as jsonc from "$std/jsonc/mod.ts"
import * as html from "$std/html/mod.ts"
import { parseArgs } from "$std/cli/mod.ts"
import JSON5 from "npm:json5"

const content = await Deno.readTextFile("base.html")

const l = console.log

export const printEscape = (s:string) => {
  l(html.escape(s))
}
const parsed = parseArgs(Deno.args)
console.log(parsed)
if (parsed._.length > 1) {
  const a = parsed._;
  for (const item of a) {
    printEscape(item)
  }
}
//printEscape("Here is an & and a < and >")
//l(html)