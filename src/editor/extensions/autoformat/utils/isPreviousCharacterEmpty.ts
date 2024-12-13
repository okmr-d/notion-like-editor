import type { Editor, Location } from "slate"
import { getEditorString, getRangeBefore } from "../../../slate-utils"

export const isPreviousCharacterEmpty = (editor: Editor, at: Location) => {
  const range = getRangeBefore(editor, at)

  if (range) {
    const text = getEditorString(editor, range)

    if (text) {
      const noWhiteSpaceRegex = new RegExp(`\\S+`)

      return !noWhiteSpaceRegex.exec(text)
    }
  }

  return true
}
