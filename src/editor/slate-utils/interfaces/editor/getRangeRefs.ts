import { Editor } from "slate"

/** Get the set of currently tracked range refs of the editor. */
export const getRangeRefs = (editor: Editor) => Editor.rangeRefs(editor as any)
