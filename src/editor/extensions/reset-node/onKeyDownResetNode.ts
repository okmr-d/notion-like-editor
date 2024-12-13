import {
  isBlockAboveEmpty,
  isCollapsed,
  isSelectionAtBlockStart,
  setElements,
  someNode,
} from "../../slate-utils"
import { Editor } from "slate"
import { ResetNodePluginRule } from "./types"
import isHotkey from "is-hotkey"
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_PARAGRAPH,
} from "../../constants"

const rules: ResetNodePluginRule[] = [
  {
    types: [
      ELEMENT_HEADING_1,
      ELEMENT_HEADING_2,
      ELEMENT_HEADING_3,
      ELEMENT_BLOCKQUOTE,
    ],
    hotkey: "Enter",
    predicate: isBlockAboveEmpty,
  },
  {
    types: [
      ELEMENT_HEADING_1,
      ELEMENT_HEADING_2,
      ELEMENT_HEADING_3,
      ELEMENT_BLOCKQUOTE,
    ],
    hotkey: "Backspace",
    predicate: isSelectionAtBlockStart,
  },
]

export const onKeyDownResetNode =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (event.defaultPrevented) return

    let reset

    if (!editor.selection) return
    if (isCollapsed(editor.selection)) {
      rules.forEach(({ hotkey, predicate, types, onReset }) => {
        if (
          hotkey &&
          isHotkey(hotkey, event) &&
          predicate(editor) &&
          someNode(editor, { match: { type: types } })
        ) {
          event.preventDefault?.()

          setElements(editor, { type: ELEMENT_PARAGRAPH })

          if (onReset) {
            onReset(editor as any)
          }

          reset = true
        }
      })
    }

    return reset
  }
