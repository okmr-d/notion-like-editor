import { HeadingElement, PartiallyPartialPick } from "../../../types"

export const createHeadingElement = (
  props: PartiallyPartialPick<HeadingElement, "type">
): HeadingElement => ({
  children: [{ text: "" }],
  ...props,
})
