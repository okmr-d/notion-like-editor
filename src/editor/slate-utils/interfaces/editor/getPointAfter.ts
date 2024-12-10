import { type EditorAfterOptions, type Location, Editor } from "slate"

/** Get the point after a location. */
export const getPointAfter = (
  editor: Editor,
  at: Location,
  options?: EditorAfterOptions
) => Editor.after(editor as any, at, options)
