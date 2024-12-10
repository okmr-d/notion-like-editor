import type { EditorDirectedDeletionOptions } from "slate/dist/interfaces/editor"

import { Editor } from "slate"

/** Delete content in the editor backward from the current selection. */
export const deleteBackward = (
  editor: Editor,
  options?: EditorDirectedDeletionOptions
) => Editor.deleteBackward(editor as any, options)
