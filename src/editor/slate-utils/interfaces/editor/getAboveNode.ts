import type { Modify } from "../../types"
import type { EditorAboveOptions } from "slate/dist/interfaces/editor"

import { Editor, type Ancestor, NodeEntry } from "slate"

import type { AncestorOf } from "../node/TAncestor"

import { type ENodeMatchOptions, getQueryOptions } from "../../utils/match"

export type GetAboveNodeOptions<E extends Editor = Editor> = Modify<
  NonNullable<EditorAboveOptions<Ancestor>>,
  ENodeMatchOptions<E>
>

/** Get the ancestor above a location in the document. */
export const getAboveNode = <
  N extends AncestorOf<E>,
  E extends Editor = Editor
>(
  editor: E,
  options?: GetAboveNodeOptions<E>
): NodeEntry<N> | undefined =>
  Editor.above(editor, getQueryOptions(editor, options)) as any
