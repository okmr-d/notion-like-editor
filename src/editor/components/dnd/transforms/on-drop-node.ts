import { DropTargetMonitor } from "react-dnd"
import { Editor, Path } from "slate"
import { ReactEditor } from "slate-react"
import { UseDropNodeOptions } from "../hooks"
import { DragItemNode } from "../types"
import { getHoverDirection } from "../utils"
import { findNode, moveNodes } from "../../../slate-utils"

export const onDropNode = (
  editor: Editor,
  {
    dragItem,
    monitor,
    dropRef,
    id,
  }: {
    dragItem: DragItemNode
    monitor: DropTargetMonitor
    dropRef: any
  } & Pick<UseDropNodeOptions, "id">
) => {
  const direction = getHoverDirection({ dragItem, monitor, dropRef, id })
  if (!direction) return

  const dragEntry = findNode(editor, {
    at: [],
    match: { id: dragItem.id },
  })
  if (!dragEntry) return
  const [, dragPath] = dragEntry

  ReactEditor.focus(editor)

  let dropPath: Path | undefined
  if (direction === "bottom") {
    dropPath = findNode(editor, { at: [], match: { id } })?.[1]
    if (!dropPath) return

    if (Path.equals(dragPath, Path.next(dropPath))) return
  }

  if (direction === "top") {
    const nodePath = findNode(editor, { at: [], match: { id } })?.[1]

    if (!nodePath) return
    dropPath = [...nodePath.slice(0, -1), nodePath.at(-1)! - 1]

    if (Path.equals(dragPath, dropPath)) return
  }

  if (direction) {
    const _dropPath = dropPath as Path

    const before =
      Path.isBefore(dragPath, _dropPath) && Path.isSibling(dragPath, _dropPath)
    const to = before ? _dropPath : Path.next(_dropPath)

    moveNodes(editor, {
      at: dragPath,
      to,
    })
  }
}
