import type { TextInsertTextOptions } from "slate/dist/interfaces/transforms/text"

import { Transforms, Editor } from "slate"

/** Insert a string of text in the Editor. */
export const insertText = (
  editor: Editor,
  text: string,
  options?: TextInsertTextOptions
) => {
  Transforms.insertText(editor as any, text, options)
}
