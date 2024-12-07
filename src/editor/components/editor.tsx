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
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_PARAGRAPH,
  ELEMENT_TITLE,
} from "../constants"
import { Editor_Value } from "../types"
import { FloatingToolbar } from "./floating-toolbar"
import { withForcedLayout } from "../extensions"
import { match } from "ts-pattern"

const initialValue: Editor_Value = [
  {
    type: ELEMENT_TITLE,
    children: [{ text: "Title" }],
  },
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
]

export const Editor = () => {
  const [editor] = useState(() =>
    withForcedLayout(withHistory(withReact(createEditor())))
  )
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

const Element = ({ attributes, children, element }: RenderElementProps) =>
  match(element.type)
    .with(ELEMENT_TITLE, () => (
      <div className="pt-28" {...attributes}>
        <h1
          className="pt-[3px] px-0.5 text-[40px]/[1.2] font-bold"
          data-placeholder="新規ページ"
        >
          {children}
        </h1>
      </div>
    ))
    .with(ELEMENT_BLOCKQUOTE, () => (
      <blockquote className="border-l-4 pl-4 py-2 mt-6" {...attributes}>
        {children}
      </blockquote>
    ))
    .with(ELEMENT_HEADING_1, () => (
      <h2 className="text-5xl leading-[1.2] font-bold mt-6" {...attributes}>
        {children}
      </h2>
    ))
    .with(ELEMENT_HEADING_2, () => (
      <h3 className="text-3xl leading-[1.3] font-bold mt-6" {...attributes}>
        {children}
      </h3>
    ))
    .with(ELEMENT_HEADING_3, () => (
      <h4 className="text-xl leading-[1.4] font-bold mt-6" {...attributes}>
        {children}
      </h4>
    ))
    .with(ELEMENT_PARAGRAPH, () => (
      <div {...attributes} className="mt-0.5 mb-px">
        <div className="flex">
          <div className="py-[3px] px-0.5 caret-foreground">{children}</div>
        </div>
      </div>
    ))
    .exhaustive()

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
