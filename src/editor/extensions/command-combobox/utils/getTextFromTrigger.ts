import {
  escapeRegExp,
  getEditorString,
  getPointBefore,
  getRange,
} from "../../../slate-utils"
import type { Editor, Point } from "slate"

export const getTextFromTrigger = (
  editor: Editor,
  {
    at,
    searchPattern = `\\S+`,
    trigger,
  }: { at: Point; searchPattern?: string; trigger: string }
) => {
  const escapedTrigger = escapeRegExp(trigger)
  const triggerRegex = new RegExp(`(?:^|\\s)${escapedTrigger}`)

  let start: Point | undefined = at
  let end: Point | undefined

  while (true) {
    end = start

    if (!start) break

    start = getPointBefore(editor, start)
    const charRange = start && getRange(editor, start, end)
    const charText = getEditorString(editor, charRange)

    if (!charText.match(searchPattern)) {
      start = end

      break
    }
  }

  const range = start && getRange(editor, start, at)
  const text = getEditorString(editor, range)

  if (!range || !text.match(triggerRegex)) return

  return {
    range,
    textAfterTrigger: text.slice(trigger.length),
  }
}
