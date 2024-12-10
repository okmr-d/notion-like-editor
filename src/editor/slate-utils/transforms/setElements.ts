import type { Editor, Element } from "slate"
import type { TNodeProps } from "../interfaces"

import {
  type SetNodesOptions,
  setNodes,
} from "../interfaces/transforms/setNodes"

export const setElements = (
  editor: Editor,
  props: Partial<TNodeProps<Element>>,
  options?: SetNodesOptions
) => setNodes<Element>(editor, props, options)
