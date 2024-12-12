import { Editor } from "slate"
import { writingModeStore } from "./writing-mode.store"
import isHotkey, { isKeyHotkey } from "is-hotkey"

export const onKeyDownWritingMode =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (!isHotkey(["Alt", "opt"], { byKey: true })(event)) {
      writingModeStore.setState({ isWritingMode: true })
    }
  }

export const onMouseMoveWritingMode =
  (editor: Editor) => (event: React.MouseEvent) => {
    writingModeStore.setState({ isWritingMode: false })
  }
