import { Editor, Path, Element } from "slate"
import { ReactEditor } from "slate-react"
import { findNode, moveNodes } from "../../../slate-utils"
import { DragItem, DropAreaItem } from "../types"

export const dropNode = (
  editor: Editor,
  {
    dragItem,
    dropArea,
  }: {
    dragItem: DragItem
    dropArea: DropAreaItem
  }
) => {
  ReactEditor.focus(editor)

  const dragPath = findNode(editor, { at: [], match: { id: dragItem.id } })?.[1]
  if (!dragPath || !dragPath.length) {
    return
  }

  const dropPath = findNode(editor, { at: [], match: { id: dropArea.id } })?.[1]
  if (!dropPath || !dropPath.length) {
    return
  }

  if (Path.equals(dragPath, dropPath)) {
    return
  }

  // 前方向で同じ階層か
  const before =
    Path.isBefore(dragPath, dropPath) && Path.isSibling(dragPath, dropPath)

  const nextPath = before
    ? dropPath
    : [...dropPath.slice(0, dropPath.length - 1), dropPath.at(-1)! + 1]

  if (Path.equals(dragPath, nextPath)) {
    return
  }

  moveNodes(editor, {
    at: dragPath,
    to: nextPath,
  })
}
