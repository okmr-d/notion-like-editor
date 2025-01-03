import type { EditorPathRefOptions } from "slate/dist/interfaces/editor"

import { type Path, Editor } from "slate"

/**
 * Create a mutable ref for a `Path` object, which will stay in sync as new
 * operations are applied to the editor.
 */
export const createPathRef = (
  editor: Editor,
  at: Path,
  options?: EditorPathRefOptions
) => Editor.pathRef(editor as any, at, options as any)
