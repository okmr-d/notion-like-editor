import type { EditorRangeRefOptions } from "slate/dist/interfaces/editor"

import { type Range, Editor } from "slate"

/**
 * Create a mutable ref for a `Range` object, which will stay in sync as new
 * operations are applied to the editor.
 */
export const createRangeRef = (
  editor: Editor,
  range: Range,
  options?: EditorRangeRefOptions
) => Editor.rangeRef(editor as any, range, options as any)
