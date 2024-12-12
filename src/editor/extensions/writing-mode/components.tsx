import { use, useEffect } from "react"
import { useWritingModeStore } from "./writing-mode.store"

export const WritingModeSwitch = () => {
  const isWritingMode = useWritingModeStore((store) => store.isWritingMode)
  useEffect(() => {
    if (isWritingMode) {
      document.body.setAttribute("data-writing-mode", "true")
    } else {
      document.body.removeAttribute("data-writing-mode")
    }
  }, [isWritingMode])
  return null
}
