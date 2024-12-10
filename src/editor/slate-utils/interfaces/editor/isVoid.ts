import { Editor } from "slate"

import { isElement } from "../element"

/** Check if a value is a void `Element` object. */
export const isVoid = (editor: Editor, value: any): boolean => {
  return isElement(value) && Editor.isVoid(editor as any, value)
}
