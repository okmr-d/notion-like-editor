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
import { withNormalize } from "../extensions"
import { Element } from "./element"
import { Leaf } from "./leaf"

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
    withNormalize(withHistory(withReact(createEditor())))
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
