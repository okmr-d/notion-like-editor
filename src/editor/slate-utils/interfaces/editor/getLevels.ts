import type { Modify } from "../../types"

import { type EditorLevelsOptions, Editor, Node, NodeEntry } from "slate"

import type { NodeOf, TNodeMatch } from "../node/TNode"

export type GetLevelsOptions<E extends Editor = Editor> = Modify<
  NonNullable<EditorLevelsOptions<Node>>,
  {
    match?: TNodeMatch<NodeOf<E>>
  }
>

/** Iterate through all of the levels at a location. */
export const getLevels = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  options?: GetLevelsOptions<E>
): Generator<NodeEntry<N>, void, undefined> =>
  Editor.levels(editor as any, options as any) as any
