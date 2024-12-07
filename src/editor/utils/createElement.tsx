import { Element } from "slate"
import { match } from "ts-pattern"
import {
  createParagraphElement,
  createTitleElement,
  createHeadingElement,
  createBlockquoteElement,
} from "../extensions"
import { PartiallyPartialPick } from "../types"

export const createElement = ({
  type,
  ...props
}: PartiallyPartialPick<Element, "type">): Element =>
  match(type)
    .with("title", () => createTitleElement(props))
    .with("heading-1", () =>
      createHeadingElement({ type: "heading-1", ...props })
    )
    .with("heading-2", () =>
      createHeadingElement({ type: "heading-2", ...props })
    )
    .with("heading-3", () =>
      createHeadingElement({ type: "heading-3", ...props })
    )
    .with("paragraph", () => createParagraphElement(props))
    .with("blockquote", () => createBlockquoteElement(props))
    .exhaustive()
