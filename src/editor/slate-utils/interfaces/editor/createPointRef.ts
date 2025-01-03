import type { EditorPointRefOptions } from "slate/dist/interfaces/editor"

import { type Point, Editor } from "slate"

/**
 * Create a mutable ref for a `Point` object, which will stay in sync as new
 * operations are applied to the editor.
 */
export const createPointRef = (
  editor: Editor,
  point: Point,
  options?: EditorPointRefOptions
) => Editor.pointRef(editor as any, point, options as any)
