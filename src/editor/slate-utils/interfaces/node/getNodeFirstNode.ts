import { type Path, Node, NodeEntry } from "slate"

import type { NodeOf } from "./TNode"

/** Get the first node entry in a root node from a path. */
export const getNodeFirstNode = <N extends NodeOf<R>, R extends Node = Node>(
  root: R,
  path: Path
) => Node.first(root, path) as NodeEntry<N>
