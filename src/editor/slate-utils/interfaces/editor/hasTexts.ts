import { type Element, Editor } from "slate"

/** Check if a node has text children. */
export const hasTexts = (editor: Editor, element: Element) =>
  Editor.hasTexts(editor as any, element)
