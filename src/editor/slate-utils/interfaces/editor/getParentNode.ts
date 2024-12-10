import { type EditorParentOptions, type Location, Editor } from "slate"

/** Get the parent node of a location. Returns undefined if there is no parent. */
export const getParentNode = (
  editor: Editor,
  at: Location,
  options?: EditorParentOptions
) => {
  try {
    return Editor.parent(editor, at, options)
  } catch (error) {}
}
