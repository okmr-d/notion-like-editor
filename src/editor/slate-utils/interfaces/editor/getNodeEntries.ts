import type { Modify } from "../../types"

import { type EditorNodesOptions, Editor, Node, NodeEntry } from "slate"

import type { NodeOf } from "../node/TNode"

import { type ENodeMatchOptions, getQueryOptions } from "../../utils/match"
import { type UnhangRangeOptions, unhangRange } from "./unhangRange"

export type GetNodeEntriesOptions<E extends Editor = Editor> = Modify<
  NonNullable<EditorNodesOptions<Node>>,
  ENodeMatchOptions<E>
> &
  UnhangRangeOptions

/** Iterate through all of the nodes in the Editor. */
export const getNodeEntries = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  options?: GetNodeEntriesOptions<E>
): Generator<NodeEntry<N>, void, undefined> => {
  unhangRange(editor, options?.at, options)

  return Editor.nodes(editor as any, getQueryOptions(editor, options)) as any
}
