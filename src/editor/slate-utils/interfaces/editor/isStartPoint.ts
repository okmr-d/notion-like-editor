import { type Location, type Point, Editor } from "slate"

/**
 * Check if a point is the start point of a location. If point is null, return
 * false.
 */
export const isStartPoint = (
  editor: Editor,
  point: Point | null | undefined,
  at: Location
) => !!point && Editor.isStart(editor as any, point, at)
