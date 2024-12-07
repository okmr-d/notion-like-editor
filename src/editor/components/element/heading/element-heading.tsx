import { RenderElementProps } from "slate-react"
import { match } from "ts-pattern"
import { usePlaceholderState } from "../../../hooks"
import { HeadingElement } from "../../../types"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export const ElementHeading = ({
  attributes,
  children,
  element,
}: RenderElementProps & {
  element: HeadingElement
}) => {
  const { showPlaceholder } = usePlaceholderState({
    element,
    hideOnBlur: false,
  })

  const { Component, containerClassName, className, placeholder } = useMemo(
    () =>
      match(element.type)
        .with("heading-1", () => ({
          Component: "h2" as const,
          containerClassName: "mt-8 mb-1",
          className: "text-[30px]/[1.3] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し1",
        }))
        .with("heading-2", () => ({
          Component: "h3" as const,
          containerClassName: "mt-6 mb-px",
          className: "text-[24px]/[1.3] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し2",
        }))
        .with("heading-3", () => ({
          Component: "h4" as const,
          containerClassName: "mt-4 mb-px",
          className: "text-[20px]/[1.3] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し3",
        }))
        .exhaustive(),
    [element.type]
  )

  return (
    <div {...attributes} className={containerClassName}>
      <Component
        className={cn(
          className,
          showPlaceholder &&
            "before:absolute before:cursor-text before:opacity-15 before:content-[attr(data-placeholder)]"
        )}
        data-placeholder={placeholder}
      >
        {children}
      </Component>
    </div>
  )
}
