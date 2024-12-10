import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"

export type SplitNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.splitNodes>[1]>,
  NodeMatchOption<E>
>

/** Split the nodes at a specific location. */
export const splitNodes = <E extends Editor>(
  editor: E,
  options?: SplitNodesOptions<E>
) => Transforms.splitNodes(editor as any, options as any)
