import { RenderElementProps } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { cn } from "@/lib/utils"

export const ElementParagraph = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const { showPlaceholder } = usePlaceholderState({ element })

  return (
    <div {...attributes} className="my-px">
      <div
        className={cn(
          "py-[3px] px-[2px] caret-foreground",
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
