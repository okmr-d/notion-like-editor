import type { Modify } from "../../types"

import { type EditorNextOptions, Descendant, Editor, NodeEntry } from "slate"

import type { NodeOf, TNodeMatch } from "../node/TNode"

export type GetNextNodeOptions<E extends Editor = Editor> = Modify<
  NonNullable<EditorNextOptions<Descendant>>,
  {
    match?: TNodeMatch<NodeOf<E>>
  }
>

/** Get the matching node in the branch of the document after a location. */
export const getNextNode = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  options?: GetNextNodeOptions<E>
): NodeEntry<N> | undefined => Editor.next(editor as any, options as any) as any
