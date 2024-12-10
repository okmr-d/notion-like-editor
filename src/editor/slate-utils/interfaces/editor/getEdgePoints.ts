import { type Location, Editor } from "slate"

/** Get the start and end points of a location. */
export const getEdgePoints = (editor: Editor, at: Location) =>
  Editor.edges(editor as any, at)
