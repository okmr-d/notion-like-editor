import { Editor } from "slate"
import isHotkey from "is-hotkey"
import { toggleMark } from "../../utils"
import { TogglableMarkKey } from "../../types"

const rules: {
  hotkey: string
  mark: TogglableMarkKey
}[] = [
  {
    hotkey: "mod+b",
    mark: "bold",
  },
  {
    hotkey: "mod+i",
    mark: "italic",
  },
  {
    hotkey: "mod+u",
    mark: "underline",
  },
  {
    hotkey: "mod+shift+x",
    mark: "strikethrough",
  },
  {
    hotkey: "mod+e",
    mark: "code",
  },
]

export const onKeyDownToggleMark =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (event.defaultPrevented) return

    rules.forEach(({ hotkey, mark }) => {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        toggleMark(editor, mark)
      }
    })
  }
