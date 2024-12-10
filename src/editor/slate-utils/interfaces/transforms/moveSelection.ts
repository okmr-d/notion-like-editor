import type { SelectionMoveOptions } from "slate/dist/interfaces/transforms/selection"

import { Transforms, Editor } from "slate"

/** Move the selection's point forward or backward. */
export const moveSelection = (
  editor: Editor,
  options?: SelectionMoveOptions
) => {
  Transforms.move(editor as any, options)
}
