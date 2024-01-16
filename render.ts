#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

//import { render as renderHtml } from "./deps.ts";
import {
  //CSS,
  render as renderHtml,
} from "https://deno.land/x/gfm@0.4.0/mod.ts";

export const baseHtml = await Deno.readTextFile("base.html");

export interface RenderWithBaseOptions {
  sourceFile?: string | undefined;
  destFile?: string | undefined;
  printResult?: boolean | undefined;
}

/** Print or write an html file */
export function renderWithBase(
  mdstr: string,
  opts: RenderWithBaseOptions = { 
    printResult: false,
    sourceFile: undefined,
    destFile: undefined,
  },
): void {
  const rndrd = renderHtml(mdstr);
  const s = baseHtml.replace("\{\{content\}\}", rndrd);
  if (opts.printResult) {
    console.log(s);
  }
  if (typeof opts.destFile === "string") {
    Deno.writeTextFileSync(opts.destFile, s);
  } else {
    throw new TypeError("opts.destFile must be a string");
  }
}

const l = console.log;

if (import.meta.main) {
  // Test
  const content = Deno.readTextFileSync("test_data/tst.md");
  renderWithBase(content, { printResult: true });
}
