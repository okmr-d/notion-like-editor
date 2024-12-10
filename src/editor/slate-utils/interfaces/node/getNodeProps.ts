import { Node } from "slate"

import type { TNodeProps } from "./TNode"

/** Extract the custom properties from a node. */
export const getNodeProps = <N extends Node>(node: N) =>
  Node.extractProps(node) as TNodeProps<N>
