import { RenderElementProps } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { cn } from "@/lib/utils"

export const ElementTitle = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const { showPlaceholder } = usePlaceholderState({
    element,
    hideOnBlur: false,
  })

  return (
    <div {...attributes} className="pt-28 pb-3">
      <h1
        className={cn(
          "text-[40px]/[1.2] font-bold pt-[3px] px-[2px]",
          showPlaceholder &&
            "before:absolute before:cursor-text before:opacity-15 before:content-[attr(data-placeholder)]"
        )}
        data-placeholder="新規ページ"
      >
        {children}
      </h1>
    </div>
  )
}
