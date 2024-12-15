import { Element } from "slate"
import { useSlateStatic } from "slate-react"
import { CSSProperties, useMemo } from "react"
import { useDropNode } from "./hooks"
import { cn } from "@/lib/utils"
import {
  findNodePath,
  getNextNode,
  isElement,
  toDOMNode,
} from "../../slate-utils"
import { useEditorStateStore } from "../../stores"

export const DropArea = ({
  element,
  elementRef,
  direction,
}: {
  element: Element
  elementRef: React.RefObject<HTMLElement | null>
  direction: "bottom"
}) => {
  const editor = useSlateStatic()
  const isDragging = useEditorStateStore((s) => s.isDragging)
  const { isOver, dropRef } = useDropNode(editor, {
    accept: "default",
    dropArea: { id: element.id, direction },
  })

  const styles: { container: CSSProperties; line: CSSProperties } | undefined =
    useMemo(() => {
      if (isDragging) {
        const rect = elementRef.current?.getBoundingClientRect()
        const path = findNodePath(editor, element)
        if (!rect || !path) {
          return undefined
        }

        const nextNodeEntry = getNextNode(editor, {
          at: path,
          match: (n) => isElement(n),
        })
        if (!nextNodeEntry) {
          // 次の要素がない場合
          return {
            container: { height: "50%" },
            line: { top: "100%" },
          }
        }
        const nextNode = nextNodeEntry[0]
        const nextDom = toDOMNode(editor, nextNode)
        if (!nextDom) {
          // 次の要素の DOM がない場合
          return {
            container: { height: "50%" },
            line: { top: "100%" },
          }
        }
        const nextElementRect = nextDom.getBoundingClientRect()

        const containerHeight =
          // 高さの半分
          rect.height * 0.5 +
          // 次の要素のとの距離
          (nextElementRect.top - rect.bottom) +
          // 次の要素の高さの半分
          nextElementRect.height * 0.5

        const lineTop =
          // 高さの半分
          rect.height * 0.5 +
          // 次の要素のとの距離の半分
          (nextElementRect.top - rect.bottom) * 0.5

        return {
          container: { height: containerHeight },
          line: { top: lineTop },
        }
      }
    }, [isDragging, isOver])

  return (
    <div
      ref={dropRef}
      contentEditable={false}
      className={cn(
        "z-[9999] select-none absolute top-1/2 inset-x-0",
        // ドラッグ中は pointer-events を有効にする
        isDragging ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={styles && styles.container}
    >
      <div
        className={cn(
          "absolute inset-x-0 -translate-y-1/2 h-0.5 rounded-full bg-blue-300",
          isOver ? "opacity-100 transition-opacity" : "opacity-0"
        )}
        style={styles && styles.line}
      />
    </div>
  )
}
