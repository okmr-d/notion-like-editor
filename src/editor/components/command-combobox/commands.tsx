import { Editor, NodeEntry, Path } from "slate"
import {
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
} from "../../constants"
import {
  createParagraphElement,
  createHeadingElement,
  createBlockquoteElement,
} from "../../extensions"
import { insertNode, insertNodes, setElements } from "../../slate-utils"
import { ReactNode } from "react"
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  TextQuoteIcon,
  TypeIcon,
} from "lucide-react"

export enum AddCommandKey {
  ADD_PARAGRAPH = "add_paragraph",
  ADD_HEADING_1 = "add_heading_1",
  ADD_HEADING_2 = "add_heading_2",
  ADD_HEADING_3 = "add_heading_3",
  ADD_BLOCKQUOTE = "add_blockquote",
}

enum AddCommandGroup {
  BASIC = "基本",
}

interface TComboboxItem<Data> {
  key: string
  text: string
  disabled?: boolean
  data: Data
}

export type AddCommandItemData = {
  group: AddCommandGroup
  thumbnail?: ReactNode
  description: string
  keywords: string[]
}

export const BASIC_COMMANDS: TComboboxItem<AddCommandItemData>[] = [
  {
    key: AddCommandKey.ADD_PARAGRAPH,
    text: "テキスト",
    data: {
      group: AddCommandGroup.BASIC,
      thumbnail: <TypeIcon className="w-5 h-5" />,
      description: "すぐに文章を書き始められます。",
      keywords: ["テキスト", "てきすと", "text", "paragraph"],
    },
  },
  {
    key: AddCommandKey.ADD_HEADING_1,
    text: "見出し1",
    data: {
      group: AddCommandGroup.BASIC,
      thumbnail: <Heading1Icon className="w-5 h-5" />,
      description: "大きいフォントのセクション見出しです。",
      keywords: ["見出し1", "みだし1", "h1", "heading1", "header1", "1"],
    },
  },
  {
    key: AddCommandKey.ADD_HEADING_2,
    text: "見出し2",
    data: {
      group: AddCommandGroup.BASIC,
      thumbnail: <Heading2Icon className="w-5 h-5" />,
      description: "中くらいのフォントのセクション見出しです。",
      keywords: ["見出し2", "みだし2", "h2", "heading2", "header2", "2"],
    },
  },
  {
    key: AddCommandKey.ADD_HEADING_3,
    text: "見出し3",
    data: {
      group: AddCommandGroup.BASIC,
      thumbnail: <Heading3Icon className="w-5 h-5" />,
      description: "小さめのフォントのセクション見出しです。",
      keywords: ["見出し3", "みだし3", "h3", "heading3", "header3", "3"],
    },
  },
  {
    key: AddCommandKey.ADD_BLOCKQUOTE,
    text: "引用",
    data: {
      group: AddCommandGroup.BASIC,
      thumbnail: <TextQuoteIcon className="w-5 h-5" />,
      description: "引用文を入力します。",
      keywords: ["引用", "blockquote"],
    },
  },
]

export const ADD_COMMANDS: TComboboxItem<AddCommandItemData>[] = [
  ...BASIC_COMMANDS,
]

export const executeAddCommand: Record<
  AddCommandKey,
  (
    editor: Editor,
    shouldToggle: boolean,
    currentNodeEntry: NodeEntry,
    before?: boolean
  ) => void
> = {
  [AddCommandKey.ADD_PARAGRAPH]: (
    editor,
    shouldToggle,
    currentNodeEntry,
    before = false
  ) => {
    if (shouldToggle) {
      return
    }
    const insertPath = before
      ? currentNodeEntry[1]
      : Path.next(currentNodeEntry[1])

    insertNodes(editor, createParagraphElement(), {
      at: insertPath,
      select: true,
    })
  },
  [AddCommandKey.ADD_HEADING_1]: (
    editor,
    shouldToggle,
    currentNodeEntry,
    before
  ) => {
    if (shouldToggle) {
      // TODO:
      // unwrapList(editor)
      setElements(editor, { type: ELEMENT_HEADING_1 })
    } else {
      const insertPath = before
        ? currentNodeEntry[1]
        : Path.next(currentNodeEntry[1])

      insertNodes(editor, createHeadingElement({ type: ELEMENT_HEADING_1 }), {
        at: insertPath,
        select: true,
      })
    }
  },
  [AddCommandKey.ADD_HEADING_2]: (
    editor,
    shouldToggle,
    currentNodeEntry,
    before
  ) => {
    if (shouldToggle) {
      // TODO:
      // unwrapList(editor)
      setElements(editor, { type: ELEMENT_HEADING_2 })
    } else {
      const insertPath = before
        ? currentNodeEntry[1]
        : Path.next(currentNodeEntry[1])

      insertNodes(editor, createHeadingElement({ type: ELEMENT_HEADING_2 }), {
        at: insertPath,
        select: true,
      })
    }
  },
  [AddCommandKey.ADD_HEADING_3]: (
    editor,
    shouldToggle,
    currentNodeEntry,
    before
  ) => {
    if (shouldToggle) {
      // TODO:
      // unwrapList(editor)
      setElements(editor, { type: ELEMENT_HEADING_3 })
    } else {
      const insertPath = before
        ? currentNodeEntry[1]
        : Path.next(currentNodeEntry[1])

      insertNodes(editor, createHeadingElement({ type: ELEMENT_HEADING_3 }), {
        at: insertPath,
        select: true,
      })
    }
  },
  [AddCommandKey.ADD_BLOCKQUOTE]: (
    editor,
    shouldToggle,
    currentNodeEntry,
    before
  ) => {
    if (shouldToggle) {
      // TODO:
      // unwrapList(editor)
      setElements(editor, createBlockquoteElement())
    } else {
      const insertPath = before
        ? currentNodeEntry[1]
        : Path.next(currentNodeEntry[1])

      insertNode(editor, createBlockquoteElement(), {
        at: insertPath,
        select: true,
      })
    }
  },
}
