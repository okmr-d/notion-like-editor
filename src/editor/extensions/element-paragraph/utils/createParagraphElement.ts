import { generateId } from "../../../slate-utils"
import { ELEMENT_PARAGRAPH } from "../../../constants"
import { ParagraphElement } from "../../../types"

export const createParagraphElement = (
  props?: Partial<Omit<ParagraphElement, "type">>
): ParagraphElement => ({
  type: ELEMENT_PARAGRAPH,
  children: [{ text: "" }],
  id: generateId(),
  ...props,
})
