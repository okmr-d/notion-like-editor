import { DragSourceHookSpec, useDrag } from "react-dnd"
import { DragItemNode } from "../types"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"

export interface UseDragNodeOptions
  extends DragSourceHookSpec<DragItemNode, unknown, { isDragging: boolean }> {
  id: string
}

export const useDragNode = (
  editor: Editor,
  { id, item, ...options }: UseDragNodeOptions
) => {
  const [{ isDragging }, dragRef] = useDrag<
    DragItemNode,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      item: (monitor) => {
        document.body.setAttribute("data-dragging", "true")
        document.body.classList.add("!cursor-grabbing")
        ReactEditor.blur(editor)

        return {
          id,
          ...(typeof item === "function" ? item(monitor) : item),
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        document.body.removeAttribute("data-dragging")
        document.body.classList.remove("!cursor-grabbing")
        ReactEditor.focus(editor)
      },
      options: {
        dropEffect: "move",
      },
      ...options,
    }),
    []
  )

  return {
    isDragging,
    dragRef,
  }
}
