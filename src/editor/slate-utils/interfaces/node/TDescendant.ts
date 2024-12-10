import type { Editor, Element, Node } from "slate"
import type { ElementOf } from "../element/TElement"
import type { TextOf } from "../text/TText"

/** A utility type to get all the descendant node types from a root node type. */
export type DescendantOf<N extends Node> = N extends Editor
  ? ElementOf<N> | TextOf<N>
  : N extends Element
  ? ElementOf<N["children"][number]> | TextOf<N>
  : never

/** A utility type to get the child node types from a root node type. */
export type ChildOf<
  N extends Node,
  I extends number = number
> = N extends Editor
  ? N["children"][I]
  : N extends Element
  ? N["children"][I]
  : never
