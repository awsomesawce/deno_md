import { CSS, render } from "https://deno.land/x/gfm/mod.ts";
import * as fs from "https://deno.land/std@0.212.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.212.0/path/mod.ts";
import * as yaml from "https://deno.land/std@0.212.0/yaml/mod.ts";
import * as asserts from "https://deno.land/std@0.212.0/assert/mod.ts";

import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";


const THISFILE = path.fromFileUrl(import.meta.url);
const THISDIR = path.dirname(THISFILE);

/** Write rendered markdown txt to a file */
export async function writeHtmlFile (mdstr: string, filename: string): Promise<void> {
  // rndrd = rendered
  const rndrd = render(mdstr)
  try {
    await Deno.writeTextFile(filename, rndrd, {create: true})
    
  } catch (e) {
    console.error(`ERROR: \n${e}`)
  }
  console.debug(colors.cyan.underline.bold("Done!"))
}

if (import.meta.main) {
  const MD = `# Markdown string

This is a _markdown_ string.

Check out \[deno_gfm\](https://deno.land/x/gfm) for more.
`;
  const filename = path.join(THISDIR, "md.html");
  await writeHtmlFile(MD, filename);
}