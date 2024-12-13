import isHotkey from "is-hotkey"
import { getBlockAbove, queryNode } from "../../slate-utils"
import { exitBreak } from "./transforms/exitBreak"
import { Editor } from "slate"
import { ExitBreakRule } from "./types"

const rules: ExitBreakRule[] = [
  { hotkey: "mod+enter" },
  { before: true, hotkey: "mod+shift+enter" },
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
