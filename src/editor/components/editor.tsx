"use client"

import React, { useCallback, useState } from "react"
import { createEditor } from "slate"
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react"
import { withHistory } from "slate-history"
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_BULLETED_LIST,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_LIST_ITEM,
  ELEMENT_NUMBERED_LIST,
  ELEMENT_PARAGRAPH,
} from "../constants"
import { Editor_Value } from "../types"
import { FloatingToolbar } from "./floating-toolbar"

const initialValue: Editor_Value = [
  {
    type: ELEMENT_HEADING_1,
    children: [{ text: "Heading 1" }],
  },
  {
    type: ELEMENT_HEADING_2,
    children: [{ text: "Heading 2" }],
  },
  {
    type: ELEMENT_HEADING_3,
    children: [{ text: "Heading 3" }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [{ text: "A line of text in a paragraph." }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: "A line of text in a paragraph. " },
      {
        bold: true,
        text: "Bold",
      },
      { text: " / " },
      {
        italic: true,
        text: "Italic",
      },
      { text: " / " },
      {
        underline: true,
        text: "Underline",
      },
      { text: " / " },
      {
        code: true,
        text: "Code",
      },
    ],
  },
  {
    type: ELEMENT_BLOCKQUOTE,
    children: [{ text: "Blockquote text" }],
  },
  {
    type: ELEMENT_BULLETED_LIST,
    children: [
      {
        type: ELEMENT_LIST_ITEM,
        children: [{ text: "Bulleted list item" }],
      },
      {
        type: ELEMENT_LIST_ITEM,
        children: [{ text: "Bulleted list item" }],
      },
    ],
  },
  {
    type: ELEMENT_NUMBERED_LIST,
    children: [
      {
        type: ELEMENT_LIST_ITEM,
        children: [{ text: "Numbered list item" }],
      },
      {
        type: ELEMENT_LIST_ITEM,
        children: [{ text: "Numbered list item" }],
      },
    ],
  },
]

export const Editor = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        id="editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className="grid max-w-full outline-none pb-[30vh] [&>*]:col-start-2"
        style={{
          gridTemplateColumns:
            "minmax(96px, 1fr) minmax(auto, 708px) minmax(96px, 1fr)",
        }}
      />
      <FloatingToolbar />
    </Slate>
  )
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case ELEMENT_BLOCKQUOTE:
      return (
        <blockquote className="border-l-4 pl-4 py-2 mt-6" {...attributes}>
          {children}
        </blockquote>
      )
    case ELEMENT_BULLETED_LIST:
      return (
        <ul
          className="mt-6 [&>li]:list-disc [&>li]:ml-6 space-y-2"
          {...attributes}
        >
          {children}
        </ul>
      )
    case ELEMENT_HEADING_1:
      return (
        <h1 className="text-5xl leading-[1.2] font-bold mt-6" {...attributes}>
          {children}
        </h1>
      )
    case ELEMENT_HEADING_2:
      return (
        <h2 className="text-3xl leading-[1.3] font-bold mt-6" {...attributes}>
          {children}
        </h2>
      )
    case ELEMENT_HEADING_3:
      return (
        <h3 className="text-xl leading-[1.4] font-bold mt-6" {...attributes}>
          {children}
        </h3>
      )
    case ELEMENT_LIST_ITEM:
      return (
        <li className="" {...attributes}>
          {children}
        </li>
      )
    case ELEMENT_NUMBERED_LIST:
      return (
        <ol
          {...attributes}
          className="mt-6 [&>li]:list-decimal [&>li]:ml-6 space-y-2"
        >
          {children}
        </ol>
      )
    default:
      return (
        <div {...attributes} className="mt-0.5 mb-px">
          <div className="flex">
            <div className="py-[3px] px-0.5 caret-foreground">{children}</div>
          </div>
        </div>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <span className="font-bold">{children}</span>
  }

  if (leaf.italic) {
    children = <span className="italic">{children}</span>
  }

  if (leaf.underline) {
    children = <span className="underline">{children}</span>
  }
  if (leaf.strikethrough) {
    children = <span className="line-through">{children}</span>
  }

  if (leaf.code) {
    children = (
      <code className="font-mono text-[#EB5757] bg-accent rounded py-[.2em] px-[.4em] text-[85%]">
        {children}
      </code>
    )
  }

  return <span {...attributes}>{children}</span>
}
