import {
  useComposing,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react"
import { Editor_Element } from "../types"
import { Editor, Range } from "slate"

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

  const isEmptyBlock = Editor.isEmpty(editor, element) && !composing

  const showPlaceholder =
    isEmptyBlock &&
    (!hideOnBlur ||
      (editor.selection &&
        Range.isCollapsed(editor.selection) &&
        focused &&
        selected))

  return {
    showPlaceholder,
  }
}
