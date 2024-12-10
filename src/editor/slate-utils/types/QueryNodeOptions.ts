import { type Node, NodeEntry } from "slate"

/** Filter nodes. */
export interface QueryNodeOptions {
  /** List of types that are valid. If empty or undefined - allow all. */
  allow?: string[] | string | null

  /** List of types that are invalid. */
  exclude?: string[] | string | null

  /** Query the node entry. */
  filter?: <N extends Node>(entry: NodeEntry<N>) => boolean

  /** Valid path levels. */
  level?: number[] | number | null

  /** Paths above that value are invalid. */
  maxLevel?: number | null
}
