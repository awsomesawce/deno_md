#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write
import * as fs from "$std/fs/mod.ts"

import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { parseFlags, type FlagOptions } from "https://deno.land/x/cliffy@v1.0.0-rc.3/flags/mod.ts";
import { render, type RenderOptions } from "https://deno.land/x/gfm/mod.ts";
import { NotImplementedError } from "./errors.ts";

const { flags } = parseFlags(Deno.args);
const unknownArgs = parseFlags(Deno.args).unknown
/** Handle unknown args */
export function handleUnknowns: void () {
  if (unknownArgs.length > 0) {
    console.error(colors.red.bold(`Unknown arguments: ${unknownArgs}`));
  }
  for (const arg of unknownArgs) {
    console.log(render(arg))
  }
}

/** Preferred options/flags for cli.
 *
 */
interface CliOptions {
  debug?: boolean | undefined;
  verbose?: boolean | undefined;
  v?: boolean | undefined;

  /** Whether to display help message. */
  help?: boolean | undefined;
  h?: boolean | undefined;
  print?: boolean | undefined;
  p?: boolean | undefined;
  file?: string | undefined;
  f?: string | undefined;
  destFile?: string | undefined;
  d?: string | undefined;
}

if (import.meta.main) {
  if (flags.h || flags.help) {
    throw new NotImplementedError("Help not implemented yet");
  }
  
  if (flags.v || flags.verbose) {
    console.log(colors.blue("VERBOSE: Hi"))
  }
  
}