import type { Editor, Point, Range } from "slate"
import type { MatchRange } from "../types"
import { isPreviousCharacterEmpty } from "./isPreviousCharacterEmpty"
import { getPointBeforeLocation } from "../../../slate-utils"

export type GetMatchPointsReturnType =
  | {
      afterStartMatchPoint: Point | undefined
      beforeEndMatchPoint: Point
      beforeStartMatchPoint: Point | undefined
    }
  | undefined

export const getMatchPoints = (editor: Editor, { end, start }: MatchRange) => {
  const selection = editor.selection as Range

  let beforeEndMatchPoint = selection.anchor

  if (end) {
    beforeEndMatchPoint = getPointBeforeLocation(editor, selection, {
      matchString: end,
    })

    if (!beforeEndMatchPoint) return
  }

  let afterStartMatchPoint: Point | undefined
  let beforeStartMatchPoint: Point | undefined

  if (start) {
    afterStartMatchPoint = getPointBeforeLocation(editor, beforeEndMatchPoint, {
      afterMatch: true,
      matchString: start,
      skipInvalid: true,
    })

    if (!afterStartMatchPoint) return

    beforeStartMatchPoint = getPointBeforeLocation(
      editor,
      beforeEndMatchPoint,
      {
        matchString: start,
        skipInvalid: true,
      }
    )

    if (!isPreviousCharacterEmpty(editor, beforeStartMatchPoint as Point))
      return
  }

  return {
    afterStartMatchPoint,
    beforeEndMatchPoint,
    beforeStartMatchPoint,
  }
}
