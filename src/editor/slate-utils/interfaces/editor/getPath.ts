import { type EditorPathOptions, type Location, Editor } from "slate"

/** Get the path of a location. */
export const getPath = (
  editor: Editor,
  at: Location,
  options?: EditorPathOptions
) => Editor.path(editor as any, at, options as any)
