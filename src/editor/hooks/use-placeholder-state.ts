import {
  useComposing,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react"
import { Editor_Element } from "../types"
import { isCollapsed, isElementEmpty } from "../slate-utils"

export const usePlaceholderState = ({
  element,
  hideOnBlur = true,
}: {
  element: Editor_Element
  hideOnBlur?: boolean
}) => {
  const focused = useFocused()
  const selected = useSelected()
  const composing = useComposing()
  const editor = useSlateStatic()

  const showPlaceholder =
    isElementEmpty(editor, element) &&
    (!hideOnBlur
      ? !selected || !composing
      : focused && selected && !composing && isCollapsed(editor.selection))

  return {
    showPlaceholder,
  }
}
