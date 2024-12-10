import { Editor } from "slate"

/** Get the set of currently tracked point refs of the editor. */
export const getPointRefs = (editor: Editor) => Editor.pointRefs(editor as any)
