import { Ancestor, Editor } from "slate"
import { getNodeString, isInline } from "../interfaces"

/** Is an ancestor empty (empty text and no inline children). */
export const isAncestorEmpty = (editor: Editor, node: Ancestor) =>
  !getNodeString(node) && !node.children.some((n) => isInline(editor, n))
