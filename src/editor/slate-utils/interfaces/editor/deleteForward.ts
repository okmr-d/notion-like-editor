import type { EditorDirectedDeletionOptions } from "slate/dist/interfaces/editor"

import { Editor } from "slate"

/** Delete content in the editor forward from the current selection. */
export const deleteForward = (
  editor: Editor,
  options?: EditorDirectedDeletionOptions
) => Editor.deleteForward(editor as any, options)
