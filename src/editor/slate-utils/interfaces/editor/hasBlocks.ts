import { Editor, Element } from "slate"

/** Check if a node has block children. */
export const hasBlocks = (editor: Editor, element: Element) =>
  Editor.hasBlocks(editor as any, element)
