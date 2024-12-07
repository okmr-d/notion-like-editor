import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_PARAGRAPH,
  ELEMENT_TITLE,
} from "../../constants"
import { match } from "ts-pattern"
import { ElementTitle } from "./title"
import { ElementHeading } from "./heading"
import { ElementParagraph } from "./paragraph"
import { ElementBlockquote } from "./blockquote"
import { RenderElementProps } from "slate-react"

export const Element = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  return match(element)
    .with({ type: ELEMENT_TITLE }, (element) => (
      <ElementTitle element={element} attributes={attributes}>
        {children}
      </ElementTitle>
    ))
    .with({ type: ELEMENT_HEADING_1 }, (element) => (
      <ElementHeading element={element} attributes={attributes}>
        {children}
      </ElementHeading>
    ))
    .with({ type: ELEMENT_HEADING_2 }, (element) => (
      <ElementHeading element={element} attributes={attributes}>
        {children}
      </ElementHeading>
    ))
    .with({ type: ELEMENT_HEADING_3 }, (element) => (
      <ElementHeading element={element} attributes={attributes}>
        {children}
      </ElementHeading>
    ))
    .with({ type: ELEMENT_PARAGRAPH }, (element) => (
      <ElementParagraph element={element} attributes={attributes}>
        {children}
      </ElementParagraph>
    ))
    .with({ type: ELEMENT_BLOCKQUOTE }, (element) => (
      <ElementBlockquote element={element} attributes={attributes}>
        {children}
      </ElementBlockquote>
    ))
    .exhaustive()
}
