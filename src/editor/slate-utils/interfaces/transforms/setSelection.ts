import { type Range, Transforms, Editor } from "slate"

/** Set new properties on the selection. */
export const setSelection = (editor: Editor, props: Partial<Range>) => {
  Transforms.setSelection(editor as any, props)
}
