import { Editor } from "slate"
import { isCollapsed } from "../../slate-utils"
import { autoformatBlock, autoformatMark, autoformatText } from "./transforms"
import { rules } from "./rules"

export const withAutoformat = (editor: Editor) => {
  const { insertText } = editor

  editor.insertText = (text) => {
    if (!isCollapsed(editor.selection)) return insertText(text)

    for (const rule of rules!) {
      const { insertTrigger, mode = "text", query } = rule

      if (query && !query(editor as any, { ...rule, text })) continue

      const autoformatter: Record<typeof mode, any> = {
        block: autoformatBlock,
        mark: autoformatMark,
        text: autoformatText,
      }

      if (
        autoformatter[mode]?.(editor, {
          ...(rule as any),
          text,
        })
      ) {
        return insertTrigger && insertText(text)
      }
    }

    insertText(text)
  }

  return editor
}
