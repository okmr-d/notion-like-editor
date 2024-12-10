import type { Editor, Element, Node } from "slate"
import type { ElementOf } from "../element/TElement"

/** A utility type to get all the ancestor node types from a root node type. */
export type AncestorOf<N extends Node> = Editor extends N
  ? Editor | Element
  : Element extends N
  ? Element
  : N extends Editor
  ? ElementOf<N["children"][number]> | N | N["children"][number]
  : N extends Element
  ? ElementOf<N> | N
  : never
