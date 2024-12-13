import { Editor } from "slate"
import { getBlockAbove } from "./getBlockAbove"
import { GetAboveNodeOptions, isExpanded, isStartPoint } from "../interfaces"

export const isSelectionAtBlockStart = <E extends Editor>(
  editor: E,
  options?: GetAboveNodeOptions<E>
) => {
  const { selection } = editor

  if (!selection) return false

  const path = getBlockAbove(editor, options)?.[1]

  if (!path) return false

  return (
    isStartPoint(editor, selection.focus, path) ||
    (isExpanded(editor.selection) &&
      isStartPoint(editor, selection.anchor, path))
  )
}
