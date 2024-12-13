import type { Editor, Point, Range } from "slate"
import castArray from "lodash/castArray.js"
import type { AutoformatTextRule } from "../types"
import { getMatchPoints, getMatchRange } from "../utils"
import { deleteText, insertText } from "../../../slate-utils"

export interface AutoformatTextOptions extends AutoformatTextRule {
  text: string
}

export const autoformatText = (
  editor: Editor,
  { format, match: _match, text, trigger }: AutoformatTextOptions
) => {
  const selection = editor.selection as Range
  const matches = castArray(_match)

  // dup
  for (const match of matches) {
    const { end, start, triggers } = getMatchRange({
      match: Array.isArray(format)
        ? match
        : {
            end: match,
            start: "",
          },
      trigger,
    })

    if (!triggers.includes(text)) continue

    const matched = getMatchPoints(editor, { end, start })

    if (!matched) continue

    const { afterStartMatchPoint, beforeEndMatchPoint, beforeStartMatchPoint } =
      matched

    if (end) {
      deleteText(editor, {
        at: {
          anchor: beforeEndMatchPoint,
          focus: selection.anchor,
        },
      })
    }
    if (typeof format === "function") {
      format(editor, matched)
    } else {
      const formatEnd = Array.isArray(format) ? format[1] : format
      editor.insertText(formatEnd)

      if (beforeStartMatchPoint) {
        const formatStart = Array.isArray(format) ? format[0] : format

        deleteText(editor, {
          at: {
            anchor: beforeStartMatchPoint as Point,
            focus: afterStartMatchPoint as Point,
          },
        })

        insertText(editor, formatStart, {
          at: beforeStartMatchPoint,
        })
      }
    }

    return true
  }

  return false
}
