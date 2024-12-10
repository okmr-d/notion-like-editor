import type { Modify } from "../../types"

import { type NodeTextsOptions, Node, NodeEntry } from "slate"

import type { TextOf } from "../text/TText"
import type { NodeOf } from "./TNode"

/** Return a generator of all leaf text nodes in a root node. */
export const getNodeTexts = <N extends TextOf<R>, R extends Node = Node>(
  root: R,
  options?: Modify<
    NonNullable<NodeTextsOptions>,
    {
      pass?: (entry: NodeEntry<NodeOf<N>>) => boolean
    }
  >
) =>
  Node.texts(root, options as any) as Generator<NodeEntry<N>, void, undefined>
