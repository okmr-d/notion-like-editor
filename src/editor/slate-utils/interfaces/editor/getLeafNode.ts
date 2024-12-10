import type { EditorLeafOptions } from "slate/dist/interfaces/editor"

import { type Location, Editor } from "slate"

import type { TextEntryOf } from "../node/TNodeEntry"

/** Get the leaf text node at a location. */
export const getLeafNode = <E extends Editor>(
  editor: E,
  at: Location,
  options?: EditorLeafOptions
): TextEntryOf<E> => Editor.leaf(editor as any, at, options) as any
