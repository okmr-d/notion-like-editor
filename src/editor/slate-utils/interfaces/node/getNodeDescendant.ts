import { type Path, Node } from "slate"

import type { DescendantOf } from "./TDescendant"

/** Get the node at a specific path, asserting that it's a descendant node. */
export const getNodeDescendant = <
  N extends DescendantOf<R>,
  R extends Node = Node
>(
  root: R,
  path: Path
) => Node.descendant(root, path) as N
