import { useEffect, useState } from "react"
import { useFocused, useSlate } from "slate-react"
import { Editor, Range } from "slate"
import {
  autoUpdate,
  FloatingPortal,
  hide,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeIcon,
  StrikethroughIcon,
} from "../icons"
import { MarkToggle } from "./mark-toggle"

export const FloatingToolbar = () => {
  const editor = useSlate()
  const inFocus = useFocused()

  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: "top-start",
    strategy: "absolute",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        crossAxis: -50,
      }),
      shift({
        crossAxis: true,
      }),
      hide(),
    ],
    whileElementsMounted: autoUpdate,
  })

  const dismiss = useDismiss(context)

  const { getFloatingProps } = useInteractions([dismiss])

  useEffect(() => {
    const { selection } = editor

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      setIsOpen(false)
      return
    }

    const domSelection = window.getSelection()
    const range = domSelection?.getRangeAt(0)

    if (range) {
      refs.setReference({
        getBoundingClientRect: () => range.getBoundingClientRect(),
        getClientRects: () => range.getClientRects(),
      })
      setIsOpen(true)
    }
  }, [editor, editor.selection, inFocus, refs])

  return isOpen ? (
    <FloatingPortal id="editor-container">
      <div
        className="pointer-events-none pt-14 pb-3 px-9"
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          ...(middlewareData.hide?.referenceHidden && { visibility: "hidden" }),
        }}
        {...getFloatingProps()}
        onMouseDown={(e) => {
          // ツールバーがエディタからフォーカスを奪うのを防ぐ
          e.preventDefault()
        }}
      >
        <div className="pointer-events-auto h-9 flex items-center rounded-lg border shadow bg-background p-1">
          <div className="flex items-center">
            <MarkToggle markKey="bold" icon={<BoldIcon />} tooltip="太字" />
            <MarkToggle markKey="italic" icon={<ItalicIcon />} tooltip="斜体" />
            <MarkToggle
              markKey="underline"
              icon={<UnderlineIcon />}
              tooltip="下線"
            />
            <MarkToggle
              markKey="strikethrough"
              icon={<StrikethroughIcon />}
              tooltip="取り消し線"
            />
            <MarkToggle
              markKey="code"
              icon={<CodeIcon />}
              tooltip={<div>コードに変換</div>}
            />
          </div>
        </div>
      </div>
    </FloatingPortal>
  ) : null
}
