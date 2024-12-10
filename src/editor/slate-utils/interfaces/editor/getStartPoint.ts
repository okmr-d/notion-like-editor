import { type Location, Editor } from "slate"

/** Get the start point of a location. */
export const getStartPoint = (editor: Editor, at: Location) =>
  Editor.start(editor as any, at)
