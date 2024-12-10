import { Editor } from "slate"
import { getMarks } from "../slate-utils"
import { TogglableMarkKey } from "../types"

export const isMarkActive = (editor: Editor, markKey: TogglableMarkKey) => {
  const marks = getMarks(editor)
  return marks ? marks[markKey] === true : false
}
