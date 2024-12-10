import { Editor } from "slate"

/**
 * Insert a block break at the current selection.
 *
 * If the selection is currently expanded, it will be deleted first.
 */
export const insertBreak = (editor: Editor) => Editor.insertBreak(editor as any)
