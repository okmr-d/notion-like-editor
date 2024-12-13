import { Editor } from "slate"
import { getBlockAbove } from "./getBlockAbove"
import { GetAboveNodeOptions, isEndPoint } from "../interfaces"

export const isSelectionAtBlockEnd = <E extends Editor>(
  editor: E,
  options?: GetAboveNodeOptions<E>
): boolean => {
  const path = getBlockAbove(editor, options)?.[1]

  return !!path && isEndPoint(editor, editor.selection?.focus, path)
}
