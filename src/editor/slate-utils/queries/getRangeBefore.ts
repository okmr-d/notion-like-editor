import type { Editor, Location, Range } from "slate"
import { getPoint } from "../interfaces"
import {
  type PointBeforeOptions,
  getPointBeforeLocation,
} from "./getPointBeforeLocation"

export type RangeBeforeOptions = PointBeforeOptions

export const getRangeBefore = (
  editor: Editor,
  at: Location,
  options?: RangeBeforeOptions
): Range | undefined => {
  const anchor = getPointBeforeLocation(editor, at, options)

  if (!anchor) return

  const focus = getPoint(editor, at, { edge: "end" })

  return {
    anchor,
    focus,
  }
}
