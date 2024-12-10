import { type Location, type Point, Editor } from "slate"

/**
 * Check if a point is the end point of a location. If point is null, return
 * false.
 */
export const isEndPoint = (
  editor: Editor,
  point: Point | null | undefined,
  at: Location
) => !!point && Editor.isEnd(editor as any, point, at)
