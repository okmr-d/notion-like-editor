import type { Editor, Point } from "slate"
import { getEditorString, getPointAfter, getRange } from "../interfaces"

// Starts with whitespace char or nothing
const AFTER_MATCH_REGEX = /^(?:\s|$)/

/** Is a point at the end of a word */
export const isPointAtWordEnd = (editor: Editor, { at }: { at: Point }) => {
  // Point after at
  const after = getPointAfter(editor, at)

  // From at to after
  const afterRange = getRange(editor, at, after)
  const afterText = getEditorString(editor, afterRange)

  // Match regex on after text
  return !!AFTER_MATCH_REGEX.exec(afterText)
}
