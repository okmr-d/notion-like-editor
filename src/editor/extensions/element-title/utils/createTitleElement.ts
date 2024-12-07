import { ELEMENT_TITLE } from "../../../constants"
import { TitleElement } from "../../../types"

export const createTitleElement = (
  props: Partial<Omit<TitleElement, "type">>
): TitleElement => ({
  type: ELEMENT_TITLE,
  children: [{ text: "" }],
  ...props,
})
