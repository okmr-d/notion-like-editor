import type { EditorFragmentDeletionOptions } from "slate/dist/interfaces/editor"

import { Editor } from "slate"

/** Delete the content in the current selection. */
export const deleteFragment = (
  editor: Editor,
  options?: EditorFragmentDeletionOptions
) => Editor.deleteFragment(editor as any, options)
