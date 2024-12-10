import type { SelectionSetPointOptions } from "slate/dist/interfaces/transforms/selection"

import { type Point, Transforms, Editor } from "slate"

/** Set new properties on one of the selection's points. */
export const setPoint = (
  editor: Editor,
  props: Partial<Point>,
  options?: SelectionSetPointOptions
) => {
  Transforms.setPoint(editor as any, props, options)
}
