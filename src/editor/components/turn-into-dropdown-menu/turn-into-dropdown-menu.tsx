"use client"

import React, { useState } from "react"
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu"
import { Editor, Element } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import {
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  PilcrowIcon,
  TextQuoteIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  ELEMENT_PARAGRAPH,
} from "../../constants"
import { setBlockType } from "./transforms"
import { getBlockType } from "./queries"
import { deselect, getBlockAbove, select } from "../../slate-utils"
import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"

const turnIntoItems: {
  type: Element["type"]
  icon: React.ReactNode
  keywords: string[]
  label: string
  description: string
}[] = [
  {
    type: ELEMENT_PARAGRAPH,
    icon: <PilcrowIcon className="w-4 h-4" />,
    keywords: ["paragraph"],
    label: "テキスト",
    description: "すぐに文章を書き始められます。",
  },
  {
    type: ELEMENT_HEADING_1,
    icon: <Heading1Icon className="w-4 h-4" />,
    keywords: ["title", "h1"],
    label: "見出し1",
    description: "大きいフォントのセクション見出しです。",
  },
  {
    type: ELEMENT_HEADING_2,
    icon: <Heading2Icon className="w-4 h-4" />,
    keywords: ["subtitle", "h2"],
    label: "見出し2",
    description: "中くらいのフォントのセクション見出しです。",
  },
  {
    type: ELEMENT_HEADING_3,
    icon: <Heading3Icon className="w-4 h-4" />,
    keywords: ["subtitle", "h3"],
    label: "見出し3",
    description: "小さめのフォントのセクション見出しです。",
  },
  {
    type: ELEMENT_BLOCKQUOTE,
    icon: <TextQuoteIcon className="w-4 h-4" />,
    keywords: ["citation", "blockquote", ">", "|"],
    label: "引用",
    description: "引用文を入力します。",
  },
]

const getAboveBlockType = (editor: Editor) => {
  const entry = getBlockAbove<Element>(editor)
  if (!entry) {
    return null
  }
  const element = entry[0]
  return getBlockType(element)
}

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useSlate()
  const [open, setOpen] = useState(false)

  const currentType = getAboveBlockType(editor)

  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.type === (currentType ?? ELEMENT_PARAGRAPH)
      ) ?? turnIntoItems[0],
    [currentType]
  )

  if (!currentType) {
    return null
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen} {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button data-open={open} className="pl-1.5 pr-1">
              {selectedItem.label}
              <ChevronDownIcon className="w-3.5 h-3.5 ml-1" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>ブロックタイプの変換</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="center" sideOffset={2}>
        <DropdownMenuLabel>ブロックタイプの変換</DropdownMenuLabel>
        {turnIntoItems.map(({ type, icon, label, description }) => (
          <DropdownMenuCheckboxItem
            key={type}
            className="min-w-[180px] gap-2.5"
            checked={type === currentType}
            onCheckedChange={(checked) => {
              if (checked) {
                setBlockType(editor, type)
                ReactEditor.focus(editor)
                // HACK: フローティングツールバーが消えてしまうので再選択する
                setTimeout(() => {
                  const selection = editor.selection!
                  deselect(editor)
                  select(editor, selection)
                }, 100)
              }
            }}
          >
            <div className="shrink-0 bg-background self-start w-6 h-6 border rounded-sm flex items-center justify-center">
              {icon}
            </div>
            <div>
              <div className="text-sm">{label}</div>
              <div className="text-xs text-muted-foreground truncate">
                {description}
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
