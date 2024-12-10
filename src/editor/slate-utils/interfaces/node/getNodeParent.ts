import { type Path, Node } from "slate"

import type { AncestorOf } from "./TAncestor"

/** Get the parent of a node at a specific path. */
export const getNodeParent = <N extends AncestorOf<R>, R extends Node = Node>(
  root: R,
  path: Path
) => Node.parent(root, path) as N
