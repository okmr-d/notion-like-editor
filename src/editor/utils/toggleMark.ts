import { Editor } from "slate"
import { isMarkActive } from "./isMarkActive"
import { TogglableMarkKey } from "../types"
import { addMark, removeMark } from "../slate-utils"

export const toggleMark = (editor: Editor, markKey: TogglableMarkKey) => {
  const isActive = isMarkActive(editor, markKey)

  if (isActive) {
    removeMark(editor, { key: markKey })
  } else {
    addMark(editor, markKey, true)
  }
}
