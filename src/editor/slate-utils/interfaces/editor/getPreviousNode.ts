import type { Modify } from "../../types"

import { type EditorPreviousOptions, Editor, Node, NodeEntry } from "slate"

import type { NodeOf, TNodeMatch } from "../node/TNode"

export type GetPreviousNodeOptions<E extends Editor = Editor> = Modify<
  NonNullable<EditorPreviousOptions<Node>>,
  {
    match?: TNodeMatch<NodeOf<E>>
  }
>

/** Get the matching node in the branch of the document before a location. */
export const getPreviousNode = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  options?: GetPreviousNodeOptions<E>
): NodeEntry<N> | undefined =>
  Editor.previous(editor as any, options as any) as any
