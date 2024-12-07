import { ELEMENT_BLOCKQUOTE } from "../../../constants"
import { BlockquoteElement } from "../../../types"

export const createBlockquoteElement = (
  props: Partial<Omit<BlockquoteElement, "type">>
): BlockquoteElement => ({
  type: ELEMENT_BLOCKQUOTE,
  children: [{ text: "" }],
  ...props,
})
