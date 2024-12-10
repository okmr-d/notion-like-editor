import { type Location, Editor } from "slate"

import type { NodeEntryOf } from "../node/TNodeEntry"

/** Get the first node at a location. */
export const getFirstNode = <E extends Editor>(
  editor: E,
  at: Location
): NodeEntryOf<E> => Editor.first(editor as any, at) as any
