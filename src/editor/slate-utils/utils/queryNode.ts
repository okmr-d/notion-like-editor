import { Node, NodeEntry } from "slate"
import type { QueryNodeOptions } from "../types/QueryNodeOptions"
import { isElement } from "../interfaces"

function castArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/** Query the node entry. */
export const queryNode = <N extends Node>(
  entry?: NodeEntry<N>,
  { allow, exclude, filter, level, maxLevel }: QueryNodeOptions = {}
) => {
  if (!entry) return false

  const [node, path] = entry

  if (level) {
    const levels = castArray(level)

    if (!levels.includes(path.length)) {
      return false
    }
  }
  if (maxLevel && path.length > maxLevel) {
    return false
  }
  if (filter && !filter(entry)) {
    return false
  }
  if (allow) {
    const allows = castArray(allow)

    if (
      allows.length > 0 &&
      (!isElement(node) || !allows.includes(node.type))
    ) {
      return false
    }
  }
  if (exclude) {
    const excludes = castArray(exclude)

    if (
      excludes.length > 0 &&
      isElement(node) &&
      excludes.includes(node.type)
    ) {
      return false
    }
  }

  return true
}
