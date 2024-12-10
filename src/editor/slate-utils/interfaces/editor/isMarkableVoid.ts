import type { Editor } from "slate"

import { isElement } from "../element"

/** Check if a value is a markable void `Element` object. */
export const isMarkableVoid = (editor: Editor, value: any): boolean => {
  return isElement(value) && editor.markableVoid(value)
}
