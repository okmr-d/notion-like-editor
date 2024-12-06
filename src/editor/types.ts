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
  ELEMENT_BULLETED_LIST,
  ELEMENT_NUMBERED_LIST,
  ELEMENT_LIST_ITEM,
  MARK_STRIKETHROUGH,
} from "./constants"
import { ReactEditor } from "slate-react"

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
export type MyParagraphElement = {
  type: typeof ELEMENT_PARAGRAPH
  children: Editor_InlineChildren
}

export type MyHeadingElement = {
  type:
    | typeof ELEMENT_HEADING_1
    | typeof ELEMENT_HEADING_2
    | typeof ELEMENT_HEADING_3
  children: Editor_InlineChildren
}

export type MyH1Element = MyHeadingElement & {
  type: typeof ELEMENT_HEADING_1
}
export type MyH2Element = MyHeadingElement & {
  type: typeof ELEMENT_HEADING_2
}
export type MyH3Element = MyHeadingElement & {
  type: typeof ELEMENT_HEADING_3
}

export type MyBlockQuoteElement = {
  type: typeof ELEMENT_BLOCKQUOTE
  children: Editor_InlineChildren
}

export type MyBulletedListElement = {
  type: typeof ELEMENT_BULLETED_LIST
  children: MyListItemElement[]
}

export type MyNumberedListElement = {
  type: typeof ELEMENT_NUMBERED_LIST
  children: MyListItemElement[]
}

export type MyListItemElement = {
  type: typeof ELEMENT_LIST_ITEM
  children: Editor_InlineChildren
}

// Editor
export type Editor_InlineChildren = RichText[]
export type Editor_Element =
  | MyParagraphElement
  | MyHeadingElement
  | MyBlockQuoteElement
  | MyBulletedListElement
  | MyNumberedListElement
  | MyListItemElement
export type Editor_Value = Editor_Element[]
export type Editor_Descendant = Editor_Element | RichText

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: Editor_Element
    Text: RichText
  }
}
