import type { Modify } from "../../types"

import { type NodeDescendantsOptions, Node, NodeEntry } from "slate"

import type { DescendantOf } from "./TDescendant"
import { TDescendantEntry } from "./TNodeEntry"

/** Return a generator of all the descendant node entries inside a root node. */
export const getNodeDescendants = <N extends DescendantOf<R>, R extends Node>(
  root: R,
  options?: Modify<
    NonNullable<NodeDescendantsOptions>,
    {
      pass?: (node: TDescendantEntry<N>) => boolean
    }
  >
) =>
  Node.descendants(root, options as any) as Generator<
    NodeEntry<N>,
    void,
    undefined
  >
