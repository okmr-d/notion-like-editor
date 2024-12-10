import { RenderElementProps, useSlateStatic } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { useMergeRefs } from "@floating-ui/react"

export const ElementParagraph = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic()

  const { showPlaceholder } = usePlaceholderState({ element })

  const nodeRef = useRef<HTMLElement>(null)

  const ref = useMergeRefs([nodeRef, attributes.ref])

  return (
    <div {...attributes} ref={ref} className="relative my-px">
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
