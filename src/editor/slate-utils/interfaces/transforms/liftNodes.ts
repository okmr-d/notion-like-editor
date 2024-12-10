import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"

export type LiftNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.liftNodes>[1]>,
  NodeMatchOption<E>
>

/**
 * Lift nodes at a specific location upwards in the document tree, splitting
 * their parent in two if necessary.
 */
export const liftNodes = <E extends Editor>(
  editor: E,
  options?: LiftNodesOptions<E>
) => Transforms.liftNodes(editor as any, options as any)
