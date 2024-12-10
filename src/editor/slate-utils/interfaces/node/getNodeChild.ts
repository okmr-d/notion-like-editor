import { Node } from "slate"

import type { ChildOf } from "./TDescendant"

/** Get the child of a node at a specific index. */
export const getNodeChild = <
  N extends ChildOf<R, I>,
  R extends Node = Node,
  I extends number = number
>(
  root: R,
  index: I
) => Node.child(root, index) as N
