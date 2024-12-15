import { useRef } from "react"
import { Editor, Element } from "slate"
import { ReactEditor } from "slate-react"
import { DropTargetHookSpec, DropTargetMonitor, useDrop } from "react-dnd"
import { dropNode } from "../transforms"
import { collapseSelection, isExpanded } from "../../../slate-utils"
import { DragItem, DropAreaItem } from "../types"

export interface UseDropNodeOptions
  extends DropTargetHookSpec<
    DragItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  > {
  dropArea: DropAreaItem
}

export const useDropNode = (
  editor: Editor,
  { dropArea, ...options }: UseDropNodeOptions
) => {
  const dropRef = useRef<HTMLDivElement>(null)

  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >({
    canDrop: (dragItem) => {
      return true
    },
    drop: (dragItem, monitor) => {
      // 子ですでにドロップ済み
      if (monitor.didDrop()) return

      dropNode(editor, { dragItem, dropArea })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }), // only check depth 1
      canDrop: monitor.canDrop(),
    }),
    hover: (item, monitor) => {
      if (isExpanded(editor.selection)) {
        ReactEditor.focus(editor)
        collapseSelection(editor)
      }
    },
    ...options,
  })

  drop(dropRef)

  return { isOver, canDrop, dropRef }
}
