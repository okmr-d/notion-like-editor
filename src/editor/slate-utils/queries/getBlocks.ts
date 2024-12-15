import { Editor } from "slate"
import { ElementOf, getNodeEntries, GetNodeEntriesOptions } from "../interfaces"

export const getBlocks = <N extends ElementOf<E>, E extends Editor>(
  editor: E,
  options?: GetNodeEntriesOptions<E>
) => {
  return [
    ...getNodeEntries<N>(editor, {
      ...options,
      block: true,
    }),
  ]
}
