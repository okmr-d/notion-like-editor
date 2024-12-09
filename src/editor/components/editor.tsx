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
import { Editor_Value } from "../types"
import { FloatingToolbar } from "./floating-toolbar"
import { createTitleElement, withNormalize } from "../extensions"
import { Element } from "./element"
import { Leaf } from "./leaf"
import {
  KEY_COMMAND_BY_SLASH,
  onChangeHandler as onChangeHandlerCommandCombobox,
  onKeyDownHandler as onKeyDownHandlerCommandCombobox,
} from "../extensions/command-combobox"
import { CommandCombobox } from "./command-combobox"

const initialValue: Editor_Value = [
  createTitleElement({ children: [{ text: "🧩 Title" }] }),
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
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={() => {
        onChangeHandlerCommandCombobox(editor)()
      }}
    >
      <Editable
        id="editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          onKeyDownHandlerCommandCombobox(editor)(event)
        }}
        className="grid grid-cols-[minmax(96px,1fr)_minmax(auto,708px)_minmax(96px,1fr)] max-w-full outline-none pb-[30vh] [&>*]:col-start-2"
      />
      <FloatingToolbar />
      <CommandCombobox id={KEY_COMMAND_BY_SLASH} />
    </Slate>
  )
}
