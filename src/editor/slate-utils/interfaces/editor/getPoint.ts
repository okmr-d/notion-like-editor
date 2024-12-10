import { type EditorPointOptions, type Location, Editor } from "slate"

/** Get the start or end point of a location. */
export const getPoint = (
  editor: Editor,
  at: Location,
  options?: EditorPointOptions
) => Editor.point(editor as any, at, options)
