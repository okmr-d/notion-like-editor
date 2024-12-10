import { type Element, Editor } from "slate"

/** Check if an element is empty, accounting for void nodes. */
export const isElementEmpty = (editor: Editor, element: Element) =>
  Editor.isEmpty(editor as any, element)
