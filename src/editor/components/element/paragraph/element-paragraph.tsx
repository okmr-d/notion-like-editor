import { RenderElementProps, useSlateStatic } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { useMergeRefs } from "@floating-ui/react"
import { ElementLeftMenu } from "../../element-left-menu"

export const ElementParagraph = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const elementRef = useRef<HTMLElement>(null)
  const ref = useMergeRefs([elementRef, attributes.ref])

  const { showPlaceholder } = usePlaceholderState({ element })

  return (
    <div {...attributes} ref={ref} className="group/element relative my-px">
      <ElementLeftMenu
        element={element}
        elementRef={elementRef}
        menuPositionTop={3}
      />
      <div
        className={cn(
          "py-[3px] px-[2px] text-[16px]/[24px] caret-foreground",
          showPlaceholder &&
            "before:absolute before:cursor-text before:opacity-50 before:content-[attr(data-placeholder)]"
        )}
        data-placeholder="文字を入力するか、「/」 でコマンドを呼び出します…"
      >
        {children}
      </div>
    </div>
  )
}
