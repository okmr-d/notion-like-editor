import { HeadingElement, PartiallyPartialPick } from "../../../types"
import { generateId } from "../../../slate-utils"

export const createHeadingElement = (
  props: PartiallyPartialPick<HeadingElement, "type">
): HeadingElement => ({
  children: [{ text: "" }],
  id: generateId(),
  ...props,
})
