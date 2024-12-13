import { Editor } from "slate"
import { getBlockAbove } from "./getBlockAbove"
import { getPointFromLocation } from "./getPointFromLocation"
import { GetAboveNodeOptions, getStartPoint } from "../interfaces"

export const getRangeFromBlockStart = <E extends Editor>(
  editor: E,
  options: Omit<GetAboveNodeOptions<E>, "match"> = {}
) => {
  const path = getBlockAbove(editor, options)?.[1]

  if (!path) return

  const start = getStartPoint(editor, path)

  const focus = getPointFromLocation(editor, options)

  if (!focus) return

  return { anchor: start, focus }
}
