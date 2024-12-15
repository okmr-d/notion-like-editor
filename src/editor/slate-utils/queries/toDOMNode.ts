import { Editor, Node } from "slate"
import { ReactEditor } from "slate-react"

/** Find the native DOM element from a Slate node. */
export const toDOMNode = (editor: Editor, node: Node) => {
  try {
    return ReactEditor.toDOMNode(editor, node)
  } catch (error) {}
}
