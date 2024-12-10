import { Node } from "slate"

import { isText } from "../text/isText"

export const hasSingleChild = <N extends Node>(node: N): boolean => {
  if (isText(node)) {
    return true
  }

  return node.children.length === 1 && hasSingleChild(node.children[0])
}
