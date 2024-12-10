import { Descendant } from "slate"
import { isElement } from "../element"
import { isText } from "../text"

/** Check if a value implements the 'Ancestor' interface. */
export const isDescendant: (value: any) => value is Descendant = (node: any) =>
  isElement(node) || isText(node)
