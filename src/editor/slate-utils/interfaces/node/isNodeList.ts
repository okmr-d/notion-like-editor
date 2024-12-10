import { Node } from "slate"

/** Check if a value is a list of `Node` objects. */
export const isNodeList = (value: any): value is Node[] =>
  Node.isNodeList(value)
