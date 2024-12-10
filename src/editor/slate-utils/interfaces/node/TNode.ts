import type { Editor, Element, Path, Node } from "slate"
import type { ElementOf } from "../element/TElement"
import type { TextOf } from "../text/TText"

/** A utility type to get all the node types from a root node type. */
export type NodeOf<N extends Node> = ElementOf<N> | N | TextOf<N>

/** Convenience type for returning the props of a node. */
export type TNodeProps<N extends Node> = N extends Editor
  ? Omit<N, "children">
  : N extends Element
  ? Omit<N, "children">
  : Omit<N, "text">

/** A helper type for narrowing matched nodes with a predicate. */
export type TNodeMatch<N extends Node = Node> =
  | ((node: N, path: Path) => boolean)
  | ((node: N, path: Path) => node is N)
