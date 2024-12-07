import { RenderElementProps } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { BlockquoteElement } from "../../../types"
import { cn } from "@/lib/utils"

export const ElementBlockquote = ({
  attributes,
  children,
  element,
}: RenderElementProps & { element: BlockquoteElement }) => {
  const { showPlaceholder } = usePlaceholderState({
    element,
    hideOnBlur: false,
  })

  return (
    <div {...attributes} className="my-1">
      <blockquote className={cn("text-[16px]/[1.5] py-[3px] px-[2px]")}>
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
