import { type Location, Editor } from "slate"

import type { NodeEntryOf } from "../node/TNodeEntry"

/** Get the last node at a location. */
export const getLastNode = <E extends Editor>(
  editor: E,
  at: Location
): NodeEntryOf<E> => Editor.last(editor as any, at) as any
