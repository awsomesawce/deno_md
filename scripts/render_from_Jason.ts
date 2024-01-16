import {renderWithBase, type RenderWithBaseOptions} from "../render.ts"
import {cli, fs, yaml, jsonc} from "../deps.ts"
import { fromFileUrl } from "$std/path/from_file_url.ts"
import type {MdDoc} from "./save_to_json.ts"

const srcFile = fromFileUrl(import.meta.resolve("../ignore/out.json"))

export const getContentFromJson = async (pth: string): Promise<string> => {
        const txt = await Deno.readTextFile(pth)

        const obj: MdDoc = JSON.parse(txt)
        return typeof obj.content === "string" ? obj.content : "no content"
 
}



if (import.meta.main) {
    const c = await getContentFromJson(srcFile)
  const res = renderWithBase(c, {printResult:true})
    console.log(res)
}