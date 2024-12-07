import { ELEMENT_BLOCKQUOTE } from "../../../constants"
import { BlockQuoteElement } from "../../../types"

export const createBlockquoteElement = (
  props: Partial<Omit<BlockQuoteElement, "type">>
): BlockQuoteElement => ({
  type: ELEMENT_BLOCKQUOTE,
  children: [{ text: "" }],
  ...props,
})
