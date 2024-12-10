import { type Location, Editor } from "slate"

/** Get the end point of a location. */
export const getEndPoint = (editor: Editor, at: Location) =>
  Editor.end(editor as any, at)
