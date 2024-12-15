import isHotkey from "is-hotkey"
import { getBlockAbove, queryNode } from "../../slate-utils"
import { exitBreak } from "./transforms/exitBreak"
import { Editor } from "slate"
import { ExitBreakRule } from "./types"
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
} from "@/editor/constants"

const rules: ExitBreakRule[] = [
  { hotkey: "mod+enter" },
  { hotkey: "mod+shift+enter", before: true },
  {
    hotkey: "enter",
    level: 1,
    query: {
      allow: [
        ELEMENT_HEADING_1,
        ELEMENT_HEADING_2,
        ELEMENT_HEADING_3,
        ELEMENT_BLOCKQUOTE,
      ],
      end: true,
      start: true,
    },
    relative: true,
  },
]

export const onKeyDownExitBreak =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (event.defaultPrevented) return

    const entry = getBlockAbove(editor)

    if (!entry) return

    rules.forEach(({ hotkey, ...rule }) => {
      if (
        isHotkey(hotkey, event) &&
        queryNode(entry, rule.query) &&
        exitBreak(editor, rule)
      ) {
        event.preventDefault()
        event.stopPropagation()
      }
    })
  }
