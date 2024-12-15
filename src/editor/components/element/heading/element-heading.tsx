import { RenderElementProps } from "slate-react"
import { match } from "ts-pattern"
import { usePlaceholderState } from "../../../hooks"
import { HeadingElement } from "../../../types"
import { useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { ElementLeftMenu } from "../../element-left-menu"
import { useMergeRefs } from "@floating-ui/react"
import { DropArea } from "../../dnd"

export const ElementHeading = ({
  attributes,
  children,
  element,
}: RenderElementProps & {
  element: HeadingElement
}) => {
  const elementRef = useRef<HTMLElement>(null)
  const ref = useMergeRefs([elementRef, attributes.ref])

  const { showPlaceholder } = usePlaceholderState({
    element,
    hideOnBlur: false,
  })

  const {
    Component,
    containerClassName,
    className,
    placeholder,
    leftMenuWrapperClassName,
    menuPositionTop,
  } = useMemo(
    () =>
      match(element.type)
        .with("heading-1", () => ({
          Component: "h2" as const,
          containerClassName: "mt-8 mb-1",
          className: "text-[30px]/[40px] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し1",
          leftMenuWrapperClassName: "h-[46px]",
          menuPositionTop: 11,
        }))
        .with("heading-2", () => ({
          Component: "h3" as const,
          containerClassName: "mt-6 mb-px",
          className: "text-[24px]/[32px] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し2",
          leftMenuWrapperClassName: "h-[38px]",
          menuPositionTop: 7,
        }))
        .with("heading-3", () => ({
          Component: "h4" as const,
          containerClassName: "mt-4 mb-px",
          className: "text-[20px]/[26px] font-semibold py-[3px] px-[2px]",
          placeholder: "見出し3",
          leftMenuWrapperClassName: "h-[32px]",
          menuPositionTop: 4,
        }))
        .exhaustive(),
    [element.type]
  )

  return (
    <div
      {...attributes}
      ref={ref}
      className={cn("group/element relative", containerClassName)}
    >
      <ElementLeftMenu
        element={element}
        elementRef={elementRef}
        menuPositionTop={menuPositionTop}
      />
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
      <DropArea element={element} elementRef={elementRef} direction="bottom" />
    </div>
  )
}
