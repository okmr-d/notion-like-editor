import type { Simplify, UnionToIntersection } from "../../types"

import type { Editor, Element, Node, Text } from "slate"
import type { TNodeProps } from "../node/TNode"

/** A utility type to get all the text node types from a root node type. */
export type TextOf<N extends Node> = Editor extends N
  ? Text
  : Element extends N
  ? Text
  : N extends Editor
  ? TextOf<N["children"][number]>
  : N extends Element
  ? Extract<N["children"][number], Text> | TextOf<N["children"][number]>
  : N extends Text
  ? N
  : never

/** A utility type to get all the mark types from a root node type. */
export type MarksOf<N extends Node> = Simplify<
  UnionToIntersection<TNodeProps<TextOf<N>>>
>

export type MarkKeysOf<N extends Node> = {} extends MarksOf<N>
  ? unknown
  : keyof MarksOf<N>
