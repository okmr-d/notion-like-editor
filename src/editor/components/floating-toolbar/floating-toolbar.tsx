import { useEffect, useState } from "react"
import { useSlate } from "slate-react"
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
import { MarkToggle } from "./mark-toggle"
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react"
import { IS_APPLE } from "../../utils/environment"
import { TurnIntoDropdownMenu } from "../turn-into-dropdown-menu"

export const FloatingToolbar = () => {
  const editor = useSlate()

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
        padding: { top: 44, left: 36, right: 36 },
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
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === "" ||
      // 選択範囲にtitle要素を含む
      Range.includes(selection, [0])
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
  }, [editor, editor.selection, refs])

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-floating-toolbar", "true")
    } else {
      document.body.removeAttribute("data-floating-toolbar")
    }
  }, [isOpen])

  return isOpen ? (
    <FloatingPortal id="editor-container">
      <div
        className="pointer-events-none py-3"
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          ...(middlewareData.hide?.referenceHidden && { visibility: "hidden" }),
        }}
        {...getFloatingProps()}
        onPointerDown={(e) => {
          // エディタからフォーカスを奪うのを防ぐ
          e.preventDefault()
        }}
      >
        <div className="pointer-events-auto flex items-center rounded-lg border shadow bg-background p-1">
          <div className="flex items-center">
            <TurnIntoDropdownMenu />
            <MarkToggle
              markKey="bold"
              icon={<BoldIcon className="w-4 h-4" />}
              tooltip={
                <div className="font-medium">
                  <div>太字</div>
                  <div className="text-muted-foreground">
                    {IS_APPLE ? "⌘B" : "Ctrl+B"}
                  </div>
                </div>
              }
            />
            <MarkToggle
              markKey="italic"
              icon={<ItalicIcon className="w-4 h-4" />}
              tooltip={
                <div className="font-medium">
                  <div>斜体</div>
                  <div className="text-muted-foreground">
                    {IS_APPLE ? "⌘I" : "Ctrl+I"}
                  </div>
                </div>
              }
            />
            <MarkToggle
              markKey="underline"
              icon={<UnderlineIcon className="w-4 h-4" />}
              tooltip={
                <div className="font-medium">
                  <div>下線</div>
                  <div className="text-muted-foreground">
                    {IS_APPLE ? "⌘U" : "Ctrl+U"}
                  </div>
                </div>
              }
            />
            <MarkToggle
              markKey="strikethrough"
              icon={<StrikethroughIcon className="w-4 h-4" />}
              tooltip={
                <div className="font-medium">
                  <div>取り消し線</div>
                  <div className="text-muted-foreground">
                    {IS_APPLE ? "⌘⇧X" : "Ctrl+Shift+X"}
                  </div>
                </div>
              }
            />
            <MarkToggle
              markKey="code"
              icon={<CodeIcon className="w-4 h-4" />}
              tooltip={
                <div className="font-medium">
                  <div>コードに変換</div>
                  <div className="text-muted-foreground">
                    {IS_APPLE ? "⌘E" : "Ctrl+E"}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </FloatingPortal>
  ) : null
}
