import { Editor } from "slate"
import { editorStateStore } from "../../stores"
import isHotkey from "is-hotkey"

export const onKeyDownWritingMode =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    if (!isHotkey(["Alt", "opt"], { byKey: true })(event)) {
      editorStateStore.setState({ isWritingMode: true })
    }
  }

export const onMouseMoveWritingMode =
  (editor: Editor) => (event: React.MouseEvent) => {
    editorStateStore.setState({ isWritingMode: false })
  }
