import { ElementDragHandleButton } from "./element-drag-handle-button"
import { ElementAddButton } from "./element-add-button"
import { cn } from "@/lib/utils"
import { Element } from "slate"

export const ElementLeftMenu = ({
  element,
  wrapperClassName,
}: {
  element: Element
  wrapperClassName?: string
}) => {
  return (
    <div
      contentEditable={false}
      className={cn(
        "opacity-0 group-hover/element:opacity-100 transition-opacity absolute inset-y-0 pr-0.5 right-full w-40 flex items-start justify-end",
        "group-data-[writing-mode]/body:opacity-0 group-data-[writing-mode]/body:invisible",
        "group-data-[combobox-open]/body:opacity-0 group-data-[combobox-open]/body:invisible"
      )}
    >
      <div className={cn("flex items-center min-h-6", wrapperClassName)}>
        <ElementAddButton element={element} />
        {/* <ElementDragHandleButton /> */}
      </div>
    </div>
  )
}
