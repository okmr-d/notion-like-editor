import type { Modify } from "../../types"

import { Transforms, Editor } from "slate"

import type { NodeMatchOption } from "../../types/NodeMatchOption"

export type RemoveNodesOptions<E extends Editor = Editor> = Modify<
  NonNullable<Parameters<typeof Transforms.removeNodes>[1]>,
  NodeMatchOption<E>
>

/** Remove the nodes at a specific location in the document. */
export const removeNodes = <E extends Editor>(
  editor: E,
  options?: RemoveNodesOptions<E>
) => Transforms.removeNodes(editor as any, options as any)
