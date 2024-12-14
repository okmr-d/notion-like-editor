import { FloatingPortal } from "@floating-ui/react"
import { useMemo } from "react"
import { useDragLayer } from "react-dnd"
import { Element } from "slate"

export const DragPreview = ({
  element,
  elementRef,
  menuPositionTop,
}: {
  element: Element
  elementRef: React.RefObject<HTMLElement | null>
  menuPositionTop: number
}) => {
  const { initialOffset, currentOffset } = useDragLayer((monitor) => ({
    // item: monitor.getItem(),
    // itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    // isDragging: monitor.isDragging(),
  }))

  const html = useMemo(() => {
    const preview = elementRef.current?.cloneNode(true) as HTMLElement
    return <div dangerouslySetInnerHTML={{ __html: preview.innerHTML }} />
  }, [elementRef])

  const nodeClientRect = elementRef.current?.getBoundingClientRect()

  return (
    <FloatingPortal>
      <div
        style={{
          pointerEvents: "none",
          display: initialOffset && currentOffset ? "block" : "none",
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: nodeClientRect?.width,
          height: nodeClientRect?.height,
          transform: `translate(${(currentOffset?.x ?? 0) + 20}px, ${
            (currentOffset?.y ?? 0) - menuPositionTop
          }px)`,
        }}
      >
        {html}
      </div>
    </FloatingPortal>
  )
}
