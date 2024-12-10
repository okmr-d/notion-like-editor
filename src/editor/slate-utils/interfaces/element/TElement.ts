import { Element, Node, Editor } from "slate"

import type { TextOf } from "../text/TText"

/** Element or text of an editor. */
export type ElementOrTextOf<E extends Editor> = ElementOf<E> | TextOf<E>

/**
 * `ElementEntry` objects refer to an `Element` and the `Path` where it can be
 * found inside a root node.
 */
// export type TElementEntry = [TElement, Path];

/** A utility type to get all the element nodes type from a root node. */
export type ElementOf<N extends Node> = Editor extends N
  ? Element
  : Element extends N
  ? Element
  : N extends Editor
  ? ElementOf<N["children"][number]> | Extract<N["children"][number], Element>
  : N extends Element
  ?
      | ElementOf<N["children"][number]>
      | Extract<N["children"][number], Element>
      | N
  : never
