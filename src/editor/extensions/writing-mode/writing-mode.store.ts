import { createStore } from "zustand/vanilla"
import { useStore } from "zustand"

type WritingModeState = {
  isWritingMode: boolean
}
type WritingModeStore = WritingModeState

const defaultInitState: WritingModeState = {
  isWritingMode: false,
}

export const writingModeStore = createStore<WritingModeStore>((set) => ({
  ...defaultInitState,
}))

export const useWritingModeStore = <T>(
  selector: (store: WritingModeStore) => T
): T => useStore(writingModeStore, selector)
