import { type Element, Editor } from "slate"

/** Check if a node has inline and text children. */
export const hasInlines = (editor: Editor, element: Element) =>
  Editor.hasInlines(editor as any, element)
