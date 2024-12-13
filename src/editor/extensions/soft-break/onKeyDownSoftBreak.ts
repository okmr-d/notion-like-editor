import { Editor } from "slate"
import { getBlockAbove, queryNode } from "../../slate-utils"
import isHotkey from "is-hotkey"
import { SoftBreakRule } from "./types"

const rules: SoftBreakRule[] = [{ hotkey: "shift+enter" }]

export const onKeyDownSoftBreak =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (event.defaultPrevented) return

    const entry = getBlockAbove(editor)

    if (!entry) return

    rules.forEach(({ hotkey, query }) => {
      if (isHotkey(hotkey, event) && queryNode(entry, query)) {
        event.preventDefault()
        event.stopPropagation()

        editor.insertText("\n")
      }
    })
  }
