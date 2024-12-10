import { type Location, type Point, Editor } from "slate"

/** Check if a point is an edge of a location. */
export const isEdgePoint = (editor: Editor, point: Point, at: Location) =>
  Editor.isEdge(editor as any, point, at)
