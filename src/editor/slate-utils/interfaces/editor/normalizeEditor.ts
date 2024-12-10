import { type EditorNormalizeOptions, Editor } from "slate"

/** Normalize any dirty objects in the editor. */
export const normalizeEditor = (
  editor: Editor,
  options?: EditorNormalizeOptions
) => Editor.normalize(editor as any, options)
