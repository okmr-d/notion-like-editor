import { DragSourceHookSpec, useDrag } from "react-dnd"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"
import { DragItem } from "../types"
import { editorStateStore } from "../../../stores"

export type UseDragNodeOptions = DragSourceHookSpec<
  DragItem,
  unknown,
  { isDragging: boolean }
>

export const useDragNode = (
  editor: Editor,
  { item, ...options }: UseDragNodeOptions
) => {
  const [{ isDragging }, dragRef] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      item: (monitor) => {
        editorStateStore.setState({ isDragging: true })
        ReactEditor.blur(editor)

        const _item = typeof item === "function" ? item(monitor) : item

        return _item ?? { id: "0" }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        editorStateStore.setState({ isDragging: false })
        ReactEditor.focus(editor)
      },
      options: {
        dropEffect: "move",
      },
      ...options,
    }),
    [item]
  )

  return {
    isDragging,
    dragRef,
  }
}
