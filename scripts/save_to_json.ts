import { relative, resolve, join, toNamespacedPath, fromFileUrl } from "$std/path/posix/mod.ts"
const d1 = resolve(".")
const d2 = resolve("../test_data")
const r = relative(d1, d2)
const file = "C:/Users/Carl/Downloads/md/test_data/tst.md"
//const txt = await Deno.readTextFile("../test_data/")

const txt = await Deno.readTextFile(file)

export interface MdDoc {
    title?: string | undefined;
    content: string;
    filename?: string;
    destinationFile: string | URL;
}



const doc: MdDoc = {
    title: "testfile",
    content: txt,
    filename: resolve(file),
    destinationFile: "out.json"
}

Deno.writeTextFileSync(doc.destinationFile, JSON.stringify(doc, null, 2))