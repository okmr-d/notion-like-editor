import type { Modify } from "../../types"

import { type NodeNodesOptions, Node, NodeEntry } from "slate"

import type { NodeOf } from "./TNode"

/**
 * Return a generator of all the node entries of a root node. Each entry is
 * returned as a `[Node, Path]` tuple, with the path referring to the node's
 * position inside the root node.
 */
export const getNodes = <N extends NodeOf<R>, R extends Node = Node>(
  root: R,
  options?: Modify<
    NonNullable<NodeNodesOptions>,
    {
      pass?: (entry: NodeEntry<NodeOf<N>>) => boolean
    }
  >
) =>
  Node.nodes(root, options as any) as Generator<NodeEntry<N>, void, undefined>
