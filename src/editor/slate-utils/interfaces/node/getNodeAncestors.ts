import { type NodeAncestorsOptions, type Path, Node, NodeEntry } from "slate"

import type { AncestorOf } from "./TAncestor"

/**
 * Return a generator of all the ancestor nodes above a specific path.
 *
 * By default the order is bottom-up, from lowest to highest ancestor in the
 * tree, but you can pass the `reverse: true` option to go top-down.
 */
export const getNodeAncestors = <
  N extends AncestorOf<R>,
  R extends Node = Node
>(
  root: R,
  path: Path,
  options?: NodeAncestorsOptions
) =>
  Node.ancestors(root, path, options) as Generator<
    NodeEntry<N>,
    void,
    undefined
  >
