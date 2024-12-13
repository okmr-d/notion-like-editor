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
import {
  createTitleElement,
  withNormalize,
  KEY_COMMAND_BY_BUTTON,
  KEY_COMMAND_BY_SLASH,
  onChangeCommandCombobox,
  onKeyDownCommandCombobox,
  onKeyDownExitBreak,
  onKeyDownSoftBreak,
  onKeyDownWritingMode,
  onMouseMoveWritingMode,
  WritingModeSwitch,
  onKeyDownResetNode,
  onKeyDownAutoformat,
  withAutoformat,
} from "../extensions"
import { FloatingToolbar } from "./floating-toolbar"
import { Element } from "./element"
import { Leaf } from "./leaf"

import { CommandCombobox } from "./command-combobox"

const initialValue: Editor_Value = [
  createTitleElement({ children: [{ text: "" }] }),
]

export const Editor = () => {
  const [editor] = useState(() =>
    withAutoformat(withNormalize(withHistory(withReact(createEditor()))))
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
    <>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={() => {
          onChangeCommandCombobox(editor)()
        }}
      >
        <Editable
          id="editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            onKeyDownCommandCombobox(editor)(event)
            onKeyDownWritingMode(editor)(event)
            onKeyDownExitBreak(editor)(event)
            onKeyDownSoftBreak(editor)(event)
            onKeyDownResetNode(editor)(event)
            onKeyDownAutoformat(editor)(event)
          }}
          onMouseMove={(event) => {
            onMouseMoveWritingMode(editor)(event)
          }}
          className="grid grid-cols-[minmax(96px,1fr)_minmax(auto,708px)_minmax(96px,1fr)] max-w-full outline-none pb-[30vh] [&>*]:col-start-2"
        />
        <FloatingToolbar />
        <CommandCombobox id={KEY_COMMAND_BY_SLASH} />
        <CommandCombobox id={KEY_COMMAND_BY_BUTTON} />
      </Slate>
      <WritingModeSwitch />
    </>
  )
}
