import { ElementAddButton } from "./element-add-button"
import { ElementDragHandleButton } from "./element-drag-handle-button"
import { cn } from "@/lib/utils"
import { Element } from "slate"

export const ElementLeftMenu = ({
  element,
  elementRef,
  menuPositionTop = 0,
}: {
  element: Element
  elementRef: React.RefObject<HTMLElement | null>
  menuPositionTop?: number
}) => {
  return (
    <div
      contentEditable={false}
      className={cn(
        "opacity-0 group-hover/element:opacity-100 transition-[visibility,opacity] absolute inset-y-0 pr-0.5 right-full w-40 flex items-start justify-end select-none",
        // data-writing-mode
        "group-data-[writing-mode]/body:opacity-0 group-data-[writing-mode]/body:invisible",
        // data-combobox-open
        "group-data-[combobox-open]/body:opacity-0 group-data-[combobox-open]/body:invisible",
        // data-draggin
        "group-data-[dragging]/body:opacity-0 group-data-[dragging]/body:invisible",
        // data-floating-toolbar
        "group-data-[floating-toolbar]/body:opacity-0 group-data-[floating-toolbar]/body:invisible"
      )}
      data-pt={menuPositionTop}
      style={{
        paddingTop: `${menuPositionTop}px`,
      }}
    >
      <div className="flex items-center h-6">
        <ElementAddButton element={element} />
        <ElementDragHandleButton
          element={element}
          elementRef={elementRef}
          menuPositionTop={menuPositionTop}
        />
      </div>
    </div>
  )
}
