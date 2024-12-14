import { RenderElementProps } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { BlockquoteElement } from "../../../types"
import { cn } from "@/lib/utils"
import { ElementLeftMenu } from "../../element-left-menu"
import { useRef } from "react"
import { useMergeRefs } from "@floating-ui/react"

export const ElementBlockquote = ({
  attributes,
  children,
  element,
}: RenderElementProps & { element: BlockquoteElement }) => {
  const elementRef = useRef<HTMLElement>(null)
  const ref = useMergeRefs([elementRef, attributes.ref])

  const { showPlaceholder } = usePlaceholderState({
    element,
    hideOnBlur: false,
  })

  return (
    <div {...attributes} ref={ref} className="group/element relative my-1">
      <ElementLeftMenu
        element={element}
        elementRef={elementRef}
        menuPositionTop={3}
      />
      <blockquote className={cn("text-[16px]/[24px] py-[3px] px-[2px]")}>
        <div className="px-4 border-l-[3px] border-current">
          <div
            className={cn(
              showPlaceholder &&
                "before:absolute before:cursor-text before:opacity-50 before:content-[attr(data-placeholder)]"
            )}
            data-placeholder="入力してください"
          >
            {children}
          </div>
        </div>
      </blockquote>
    </div>
  )
}
