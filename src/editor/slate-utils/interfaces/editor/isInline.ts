import { Editor } from "slate"

import { isElement } from "../element"

/** Check if a value is an inline `Element` object. */
export const isInline = (editor: Editor, value: any): boolean =>
  isElement(value) && Editor.isInline(editor as any, value)
