import type { Editor, Node, Path } from "slate"
import { ReactEditor } from "slate-react"

export const findNodePath = (editor: Editor, node: Node): Path | undefined => {
  try {
    return ReactEditor.findPath(editor, node)
  } catch (error) {}
}
