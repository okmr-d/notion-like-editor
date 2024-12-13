import { Editor } from "slate"
import { AncestorOf, getAboveNode, GetAboveNodeOptions } from "../interfaces"

export const getBlockAbove = <N extends AncestorOf<E>, E extends Editor>(
  editor: E,
  options: GetAboveNodeOptions<E> = {}
) =>
  getAboveNode<N, E>(editor, {
    ...options,
    block: true,
  })
