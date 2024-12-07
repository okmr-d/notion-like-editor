import { BaseEditor } from "slate"
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_CODE,
  MARK_COLOR,
  ELEMENT_PARAGRAPH,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_BLOCKQUOTE,
  MARK_STRIKETHROUGH,
  ELEMENT_TITLE,
} from "./constants"
import { ReactEditor } from "slate-react"

export type PartiallyPartialOmit<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
export type PartiallyPartialPick<T, K extends keyof T> = Pick<T, K> &
  Partial<Pick<T, K>>

/**
 * Text
 */
export type EmptyText = {
  text: ""
}

export type PlainText = {
  text: string
}

export type RichText = {
  text: string
  [MARK_BOLD]?: boolean
  [MARK_ITALIC]?: boolean
  [MARK_UNDERLINE]?: boolean
  [MARK_STRIKETHROUGH]?: boolean
  [MARK_CODE]?: boolean
  [MARK_COLOR]?: string
}

export type TogglableMarkKey =
  | typeof MARK_BOLD
  | typeof MARK_ITALIC
  | typeof MARK_UNDERLINE
  | typeof MARK_STRIKETHROUGH
  | typeof MARK_CODE

/**
 * Element
 */
export type TitleElement = {
  type: typeof ELEMENT_TITLE
  children: [PlainText]
}

export type HeadingElement = {
  type:
    | typeof ELEMENT_HEADING_1
    | typeof ELEMENT_HEADING_2
    | typeof ELEMENT_HEADING_3
  children: Editor_InlineChildren
}

export type Heading1Element = HeadingElement & {
  type: typeof ELEMENT_HEADING_1
}
export type Heading2Element = HeadingElement & {
  type: typeof ELEMENT_HEADING_2
}
export type Heading3Element = HeadingElement & {
  type: typeof ELEMENT_HEADING_3
}

export type ParagraphElement = {
  type: typeof ELEMENT_PARAGRAPH
  children: Editor_InlineChildren
}

export type BlockQuoteElement = {
  type: typeof ELEMENT_BLOCKQUOTE
  children: Editor_InlineChildren
}

// Editor
export type Editor_InlineChildren = RichText[]
export type Editor_Element =
  | TitleElement
  | HeadingElement
  | ParagraphElement
  | BlockQuoteElement
export type Editor_Value = Editor_Element[]
export type Editor_Descendant = Editor_Element | RichText

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: Editor_Element
    Text: RichText
  }
}
