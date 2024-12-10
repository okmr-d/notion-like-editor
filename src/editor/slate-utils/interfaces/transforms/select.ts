import { type Location, Transforms, Editor } from "slate"

/** Set the selection to a new value. */
export const select = (editor: Editor, target: Location) => {
  Transforms.select(editor as any, target)
}
