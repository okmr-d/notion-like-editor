"use client"

import React, { useCallback, useState } from "react"
import { createEditor, Descendant } from "slate"
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
  onKeyDownResetNode,
  onKeyDownAutoformat,
  withAutoformat,
  onKeyDownToggleMark,
  withNodeId,
} from "../extensions"
import { FloatingToolbar } from "./floating-toolbar"
import { Element } from "./element"
import { Leaf } from "./leaf"
import { CommandCombobox } from "./command-combobox"
import { DndProvider } from "./dnd"
import { TooltipProvider } from "./tooltip"
import { BodyDataAttributeSwitch } from "./body-data-attribute-switch"

const initialValue: Editor_Value = [
  createTitleElement({ children: [{ text: "" }] }),
]

export const Editor = () => {
  const [editor] = useState(() =>
    withAutoformat(
      withNormalize(withNodeId(withHistory(withReact(createEditor()))))
    )
  )
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  const handleChange = useCallback(
    (value: Descendant[]) => {
      onChangeCommandCombobox(editor)()
    },
    [editor]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      onKeyDownCommandCombobox(editor)(event)
      onKeyDownWritingMode(editor)(event)
      onKeyDownExitBreak(editor)(event)
      onKeyDownSoftBreak(editor)(event)
      onKeyDownResetNode(editor)(event)
      onKeyDownAutoformat(editor)(event)
      onKeyDownToggleMark(editor)(event)
    },
    [editor]
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      onMouseMoveWritingMode(editor)(event)
    },
    [editor]
  )

  return (
    <DndProvider>
      <TooltipProvider delayDuration={200} disableHoverableContent>
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={handleChange}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
            onMouseMove={handleMouseMove}
            className="grid grid-cols-[minmax(96px,1fr)_minmax(auto,708px)_minmax(96px,1fr)] max-w-full outline-none pb-[30vh] [&>*]:col-start-2"
          />
          <FloatingToolbar />
          <CommandCombobox id={KEY_COMMAND_BY_SLASH} />
          <CommandCombobox id={KEY_COMMAND_BY_BUTTON} />
        </Slate>
        <BodyDataAttributeSwitch />
      </TooltipProvider>
    </DndProvider>
  )
}
