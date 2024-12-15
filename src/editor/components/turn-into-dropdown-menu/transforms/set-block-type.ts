import { Editor, NodeEntry, Path, Element } from "slate"
import {
  getBlocks,
  getNodeEntry,
  withoutNormalizing,
} from "../../../slate-utils"

const setBlockMap: Record<
  string,
  (editor: Editor, type: string, entry: NodeEntry<Element>) => void
> = {
  // [ACTION_THREE_COLUMNS]: (editor) => toggleColumnGroup(editor, { layout: 3 }),
  // [INDENT_LIST_KEYS.todo]: setList,
  // [ListStyleType.Decimal]: setList,
  // [ListStyleType.Disc]: setList,
}

export const setBlockType = (
  editor: Editor,
  type: Element["type"],
  { at }: { at?: Path } = {}
) => {
  withoutNormalizing(editor, () => {
    const setEntry = (entry: NodeEntry<Element>) => {
      const [node, path] = entry

      // if (node[IndentListPlugin.key]) {
      //   unsetNodes(editor, [IndentListPlugin.key, "indent"], { at: path })
      // }
      if (type in setBlockMap) {
        return setBlockMap[type](editor, type, entry)
      }
      if (node.type !== type) {
        editor.setNodes<Element>({ type }, { at: path })
      }
    }

    if (at) {
      const entry = getNodeEntry<Element>(editor, at)

      if (entry) {
        setEntry(entry)

        return
      }
    }

    const entries = getBlocks(editor)

    entries.forEach((entry) => setEntry(entry))
  })
}
