import { RenderElementProps, useSlateStatic } from "slate-react"
import { usePlaceholderState } from "../../../hooks"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { useMergeRefs } from "@floating-ui/react"
import { Button } from "@/components/ui/button"
import { ElementLeftMenu } from "../../element-left-menu"

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
    <div {...attributes} ref={ref} className="group/element relative my-px">
      <ElementLeftMenu element={element} wrapperClassName="h-[30px]" />
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
