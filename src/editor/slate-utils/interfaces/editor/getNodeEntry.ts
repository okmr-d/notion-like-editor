import { type EditorNodeOptions, type Location, Editor, NodeEntry } from "slate"

import type { NodeOf } from "../node/TNode"

/** Get the node at a location. */
export const getNodeEntry = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  at: Location,
  options?: EditorNodeOptions
): NodeEntry<N> | undefined => {
  try {
    return Editor.node(editor as any, at, options) as any
  } catch (error) {}
}
