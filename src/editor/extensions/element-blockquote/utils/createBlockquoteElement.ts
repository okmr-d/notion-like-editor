import { ELEMENT_BLOCKQUOTE } from "../../../constants"
import { BlockquoteElement } from "../../../types"
import { generateId } from "../../../slate-utils"

export const createBlockquoteElement = (
  props: Partial<Omit<BlockquoteElement, "type">>
): BlockquoteElement => ({
  type: ELEMENT_BLOCKQUOTE,
  children: [{ text: "" }],
  id: generateId(),
  ...props,
})
