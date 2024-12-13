import { Editor, Path } from "slate"
import { exitBreakAtEdges } from "../queries/exitBreakAtEdges"
import { ExitBreakRule } from "../types"
import { getPath, insertNodes } from "../../../slate-utils"
import { createParagraphElement } from "../../element-paragraph"

export const exitBreak = (
  editor: Editor,
  {
    before,
    level = 0,
    query = {},
    relative = false,
  }: Omit<ExitBreakRule, "hotkey">
) => {
  if (!editor.selection) return

  const { isEdge, isStart, queryEdge } = exitBreakAtEdges(editor, query)

  if (isStart) before = true
  if (queryEdge && !isEdge) return

  const selectionPath = getPath(editor, editor.selection)

  const slicedPath = relative
    ? selectionPath.slice(0, -level)
    : selectionPath.slice(0, level + 1)

  const insertPath = before ? slicedPath : Path.next(slicedPath)

  insertNodes(editor, createParagraphElement(), {
    at: insertPath,
    select: !isStart,
  })

  return true
}
