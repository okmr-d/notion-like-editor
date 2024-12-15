import { useEffect } from "react"
import { useEditorStateStore } from "../stores"

export const BodyDataAttributeSwitch = () => {
  const isWritingMode = useEditorStateStore((s) => s.isWritingMode)
  const isDragging = useEditorStateStore((s) => s.isDragging)

  useEffect(() => {
    if (isWritingMode) {
      document.body.setAttribute("data-writing-mode", "true")
    } else {
      document.body.removeAttribute("data-writing-mode")
    }
  }, [isWritingMode])

  useEffect(() => {
    if (isDragging) {
      document.body.setAttribute("data-dragging", "true")
      document.body.classList.add("!cursor-grabbing")
    } else {
      document.body.removeAttribute("data-dragging")
      document.body.classList.remove("!cursor-grabbing")
    }
  }, [isDragging])

  return null
}
