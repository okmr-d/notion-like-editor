import { useRef, useState } from "react"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"
import { DropTargetHookSpec, DropTargetMonitor, useDrop } from "react-dnd"
import { DragItemNode, DropLineDirection } from "../types"
import { getHoverDirection, getNewDirection } from "../utils"
import { onDropNode } from "../transforms"
import { collapseSelection, isExpanded } from "../../../slate-utils"

export interface UseDropNodeOptions
  extends DropTargetHookSpec<DragItemNode, unknown, { isOver: boolean }> {
  id: string
}

export const useDropNode = (
  editor: Editor,
  { id, ...options }: UseDropNodeOptions
) => {
  const dropRef = useRef<HTMLDivElement>(null)
  const [dropLine, setDropLine] = useState<DropLineDirection>("")

  const [{ isOver }, drop] = useDrop<
    DragItemNode,
    unknown,
    { isOver: boolean }
  >({
    canDrop: (dragItem) => {
      return true
    },
    drop: (dragItem, monitor) => {
      // 子ですでにドロップ済み
      if (monitor.didDrop()) return

      onDropNode(editor, { dropRef, id, dragItem, monitor })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }), // only check depth 1
    }),
    hover(item: DragItemNode, monitor: DropTargetMonitor) {
      const direction = getHoverDirection({
        dragItem: item,
        monitor,
        dropRef,
        id,
      })
      const dropLineDir = getNewDirection(dropLine, direction)

      if (dropLineDir) {
        setDropLine(dropLineDir)
      }

      if (direction && isExpanded(editor.selection)) {
        ReactEditor.focus(editor)
        collapseSelection(editor)
      }
    },
    ...options,
  })

  if (!isOver && dropLine) {
    setDropLine("")
  }

  drop(dropRef)

  return { isOver, dropRef, dropLine }
}
