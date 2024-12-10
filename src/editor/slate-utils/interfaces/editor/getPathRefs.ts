import { Editor } from "slate"

/** Get the set of currently tracked path refs of the editor. */
export const getPathRefs = (editor: Editor) => Editor.pathRefs(editor as any)
