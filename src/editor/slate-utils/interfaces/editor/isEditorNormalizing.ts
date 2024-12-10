import { Editor } from "slate"

/** Check if the editor is currently normalizing after each operation. */
export const isEditorNormalizing = (editor: Editor) =>
  Editor.isNormalizing(editor as any)
