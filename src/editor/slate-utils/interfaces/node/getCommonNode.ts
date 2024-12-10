import { type Path, Node, NodeEntry } from "slate"

import type { NodeOf } from "./TNode"

/** Get an entry for the common ancesetor node of two paths. */
export const getCommonNode = <N extends NodeOf<R>, R extends Node = Node>(
  root: R,
  path: Path,
  another: Path
) => Node.common(root, path, another) as NodeEntry<N>
