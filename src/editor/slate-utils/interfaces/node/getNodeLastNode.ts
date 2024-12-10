import { type Path, Node, NodeEntry } from "slate"

import type { NodeOf } from "./TNode"

/** Get the last node entry in a root node from a path. */
export const getNodeLastNode = <N extends NodeOf<R>, R extends Node = Node>(
  root: R,
  path: Path
) => Node.last(root, path) as NodeEntry<N>
