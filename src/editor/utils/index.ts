import { Editor } from "slate"
import { RichText, TogglableMarkKey } from "../types"

export * from "./createElement"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isText = (value: any): value is { text: string } => {
  return typeof value.text === "string"
}

export const isRichText = (
  value: { text: string } & unknown
): value is RichText => {
  return Object.keys(value).length > 1
}

export const toggleMark = (editor: Editor, markKey: TogglableMarkKey) => {
  const isActive = isMarkActive(editor, markKey)

  if (isActive) {
    Editor.removeMark(editor, markKey)
  } else {
    Editor.addMark(editor, markKey, true)
  }
}

export const isMarkActive = (editor: Editor, markKey: TogglableMarkKey) => {
  const marks = Editor.marks(editor)
  return marks ? marks[markKey] === true : false
}
