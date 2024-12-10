import { Node } from "slate"

/** Check if a node matches a set of props. */
export const nodeMatches = (node: Node, props: object) =>
  Node.matches(node, props)
