import { type Range, Node } from "slate"

import type { ElementOf } from "../element/TElement"
import type { TextOf } from "../text/TText"

/** Get the sliced fragment represented by a range inside a root node. */
export const getNodeFragment = <
  N extends ElementOf<R> | TextOf<R>,
  R extends Node = Node
>(
  root: R,
  range: Range
) => Node.fragment(root, range) as N[]
