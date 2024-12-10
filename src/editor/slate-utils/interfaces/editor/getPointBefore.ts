import { type EditorBeforeOptions, type Location, Editor } from "slate"

/** Get the point before a location. */
export const getPointBefore = (
  editor: Editor,
  at: Location,
  options?: EditorBeforeOptions
) => Editor.before(editor as any, at, options)
