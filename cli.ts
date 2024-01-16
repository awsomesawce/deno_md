#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import * as cli from "https://deno.land/std@0.212.0/cli/mod.ts";
import * as asserts from "https://deno.land/std@0.212.0/assert/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { CSS, render } from "https://deno.land/x/gfm/mod.ts";

export interface CliOptions {
  verbose?: boolean | undefined;

  /** Destination filename where rendered html will be written. */
  destFile?: string | undefined;
}

/** Test `parseArgs`
 * @see https://deno.land/x/gfm/mod.ts
 */
export const testArgs = (
  args?: any,
  opts: CliOptions = { verbose: true },
) => {
  const parsed = cli.parseArgs(args);
  console.log(parsed);
  if (parsed.v) {
    console.log(colors.magenta.bgCyan("Verbose!"));
  }
  if (parsed.file) {
    // * Too much verbosity.
    console.log(colors.magenta.bgCyan("File:"), parsed.file);
    const content = Deno.readTextFileSync(parsed.file);
    console.log(content);
    console.debug(colors.brightGreen("Attempting render."));
    if (opts.destFile) {
      if (opts.verbose) {
        console.debug("Writing to file:", opts.destFile);
      }
      const rendered = render(content);
      try {
        Deno.writeTextFileSync(opts.destFile, rendered);
      } catch (e) {
        console.error(e);
      }
    }
  }
};



/** Cli for rendering and writing rendered html from markdown
 * Options:
 * -v, --verbose: Verbose output
 * -p, --print: Prints rendered html to console.
 * --file: File to render.
 * --destFile: Destination filename where rendered html will be written.
 *
 * * TODO: Add short options.
 */
export async function myCli(/* myArgs?: any | undefined */) {
  const parsed = cli.parseArgs(Deno.args);
  if (parsed.h) {
    throw new NotImplementedError(
      `cli.ts --file <file_to_read> --destFile <filename_to_write`,
    );
  }
  if (parsed.v) {
    console.debug(colors.cyan.bgYellow.bold("Verbose"));
    console.debug(colors.cyan(`Writing to ${parsed.destFile}`));
    console.debug(colors.cyan(`Reading from ${parsed.file}`));
  }
  // * TODO: Add test and `try{}` block
  if (parsed._.length > 1) {
    const a = parsed._;
    for (const item of a) {
      console.log(render(item))
    }
  }
  const myFile: string | null = typeof parsed.file === "string"
    ? parsed.file
    : null;
  const content = await Deno.readTextFile(myFile);
  const rendered = render(content);
  if (parsed.print || parsed.p) {
    console.log(colors.underline("Rendered:"));
    console.log(rendered);
  }
  const destFile: string = typeof parsed.destFile === "string"
    ? parsed.destFile
    : "";
  try {
    await Deno.writeTextFile(destFile, rendered, { create: true });
  } catch (e) {
    console.error(e);
  }
}
if (import.meta.main) {
  //testArgs(Deno.args, { destFile: "test.html", verbose: true });
  await myCli();
}
