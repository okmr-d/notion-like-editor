import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"
import type { NodeOf, TNodeProps } from "../node/TNode"

export type SetNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.setNodes>[2]>,
  NodeMatchOption<E>
>

/** Set new properties on the nodes at a location. */
export const setNodes = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  props: Partial<TNodeProps<N>>,
  options?: SetNodesOptions<E>
) => Transforms.setNodes(editor as any, props, options as any)
