import { Editor, NodeEntry } from "slate"
import {
  type GetNodeEntriesOptions,
  type NodeOf,
  getNodeEntries,
} from "../interfaces"
import { getQueryOptions } from "../utils"

export type FindNodeOptions<E extends Editor = Editor> =
  GetNodeEntriesOptions<E>

/** Find node matching the condition. */
export const findNode = <N extends NodeOf<E>, E extends Editor = Editor>(
  editor: E,
  options: FindNodeOptions<E> = {}
): NodeEntry<N> | undefined => {
  // Slate throws when things aren't found so we wrap in a try catch and return undefined on throw.
  try {
    const nodeEntries = getNodeEntries<N, E>(editor, {
      at: editor.selection || [],
      ...getQueryOptions(editor, options),
    })

    // eslint-disable-next-line no-unreachable-loop
    for (const [node, path] of nodeEntries) {
      return [node, path]
    }
  } catch (error) {
    return undefined
  }
}
