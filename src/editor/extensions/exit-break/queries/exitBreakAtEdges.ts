import {
  isExpanded,
  isSelectionAtBlockEnd,
  isSelectionAtBlockStart,
} from "../../../slate-utils"
import { Editor } from "slate"

export const exitBreakAtEdges = (
  editor: Editor,
  {
    end,
    start,
  }: {
    end?: boolean
    start?: boolean
  }
) => {
  let queryEdge = false
  let isEdge = false
  let isStart = false

  if (start || end) {
    queryEdge = true

    if (start && isSelectionAtBlockStart(editor)) {
      isEdge = true
      isStart = true
    }
    if (end && isSelectionAtBlockEnd(editor)) {
      isEdge = true
    }
    if (isEdge && isExpanded(editor.selection)) {
      editor.deleteFragment()
    }
  }

  return {
    isEdge,
    isStart,
    queryEdge,
  }
}
