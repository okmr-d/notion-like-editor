import { type NodeChildrenOptions, type Path, Node, NodeEntry } from "slate"

import type { ChildOf } from "./TDescendant"

/** Iterate over the children of a node at a specific path. */
export const getNodeChildren = <N extends ChildOf<R>, R extends Node = Node>(
  root: R,
  path: Path,
  options?: NodeChildrenOptions
) =>
  Node.children(root, path, options) as Generator<NodeEntry<N>, void, undefined>
