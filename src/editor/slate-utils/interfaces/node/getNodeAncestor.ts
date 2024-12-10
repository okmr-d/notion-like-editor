import { type Path, Node } from "slate"

import type { AncestorOf } from "./TAncestor"

/** Get the node at a specific path, asserting that it's an ancestor node. */
export const getNodeAncestor = <N extends AncestorOf<R>, R extends Node = Node>(
  root: R,
  path: Path
) => Node.ancestor(root, path) as N
