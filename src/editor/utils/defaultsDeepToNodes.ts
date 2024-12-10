import { Node } from "slate"
import { ApplyDeepToNodesOptions, applyDeepToNodes } from "./applyDeepToNodes"
import defaults from "lodash/defaults.js"

/** Recursively merge a source object to children nodes with a query. */
export const defaultsDeepToNodes = <N extends Node>(
  options: Omit<ApplyDeepToNodesOptions<N>, "apply">
) => {
  applyDeepToNodes({ ...options, apply: defaults })
}
