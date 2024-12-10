import { type EditorVoidOptions, Editor, NodeEntry } from "slate"

import type { ElementOf } from "../element/TElement"

/** Match a void node in the current branch of the editor. */
export const getVoidNode = <N extends ElementOf<E>, E extends Editor = Editor>(
  editor: E,
  options?: EditorVoidOptions
): NodeEntry<N> | undefined => Editor.void(editor as any, options) as any
