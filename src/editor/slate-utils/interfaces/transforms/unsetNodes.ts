import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"
import type { NodeOf, TNodeProps } from "../node/TNode"

export type UnsetNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.unsetNodes>[2]>,
  NodeMatchOption<E>
>

/** Unset properties on the nodes at a location. */
export const unsetNodes = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  props: (keyof TNodeProps<N>)[] | keyof TNodeProps<N>,
  options?: UnsetNodesOptions<E>
) => {
  return Transforms.unsetNodes(editor as any, props as any, options as any)
}
