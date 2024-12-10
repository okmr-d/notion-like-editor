import { type Location, Editor } from "slate"

/** Get a range of a location. */
export const getRange = (editor: Editor, at: Location, to?: Location) =>
  Editor.range(editor as any, at, to)
