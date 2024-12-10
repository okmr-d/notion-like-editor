import { Editor } from "slate"

import { isElement } from "../element"

/** Check if a value is a block `Element` object. */
export const isBlock = (editor: Editor, value: any): boolean =>
  isElement(value) && Editor.isBlock(editor as any, value)
