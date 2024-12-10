import { Node } from "slate"

/** Check if a value implements the `Node` interface. */
export const isNode = (value: any): value is Node => Node.isNode(value)
