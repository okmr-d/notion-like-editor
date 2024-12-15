import { createStore } from "zustand/vanilla"
import { useStore } from "zustand"

type EditorStateState = {
  isWritingMode: boolean
  isDragging: boolean
}
type EditorStateStore = EditorStateState

const defaultInitState: EditorStateState = {
  isWritingMode: false,
  isDragging: false,
}

export const editorStateStore = createStore<EditorStateStore>((set) => ({
  ...defaultInitState,
}))

export const useEditorStateStore = <T>(
  selector: (store: EditorStateStore) => T
): T => useStore(editorStateStore, selector)
