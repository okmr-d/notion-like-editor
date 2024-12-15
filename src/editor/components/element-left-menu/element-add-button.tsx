import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import { useCallback } from "react"
import { Element } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"
import { insertNodes, isElementEmpty, select } from "../../slate-utils"
import {
  comboboxStore,
  createParagraphElement,
  KEY_COMMAND_BY_BUTTON,
} from "../../extensions"
import { ELEMENT_PARAGRAPH } from "../../constants"

export const ElementAddButton = ({ element }: { element: Element }) => {
  const editor = useSlateStatic()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const path = ReactEditor.findPath(editor, element)

      if (e.altKey) {
        // 前の位置(現在の要素と同じ位置)に要素を追加
        insertNodes(editor, createParagraphElement(), {
          at: path,
          select: true,
        })
      } else {
        if (
          element.type === ELEMENT_PARAGRAPH &&
          isElementEmpty(editor, element)
        ) {
          // Paragraphで空の場合は要素の追加をしない
          select(editor, path)
        } else {
          // 次の位置に要素を追加
          const newPath = [...path.slice(0, path.length - 1), path.at(-1)! + 1]
          insertNodes(editor, createParagraphElement(), {
            at: newPath,
            select: true,
          })
        }
      }

      ReactEditor.focus(editor)

      setTimeout(() => {
        comboboxStore.getState().open({
          activeId: KEY_COMMAND_BY_BUTTON,
          text: "",
          targetRange: editor.selection,
        })
      }, 0)
    },
    [editor, element]
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          tabIndex={-1}
          aria-label="クリックして下にブロックを追加。Opt＋クリックで上に追加。"
          variant="ghost"
          size="icon"
          className="w-6 h-6 rounded-sm"
          onPointerDown={(e) => {
            // エディタからフォーカスを奪うのを防ぐ
            e.preventDefault()
          }}
          onClick={handleClick}
        >
          <svg
            role="graphics-symbol"
            viewBox="0 0 16 16"
            className="pointer-events-none w-4 h-4 fill-foreground opacity-35"
          >
            <path d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"></path>
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="text-center font-medium">
          クリックして<span className="text-muted-foreground">下に追加</span>
        </div>
        <div className="text-center font-medium">
          Opt＋クリック/Alt＋クリックで
          <span className="text-muted-foreground">上に追加</span>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
