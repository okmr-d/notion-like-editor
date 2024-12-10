import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"

export type MoveNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.moveNodes>[1]>,
  NodeMatchOption<E>
>

/** Move the nodes at a location to a new location. */
export const moveNodes = <E extends Editor>(
  editor: E,
  options?: MoveNodesOptions<E>
) => Transforms.moveNodes(editor as any, options as any)
