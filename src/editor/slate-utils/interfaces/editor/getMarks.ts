import { Editor } from "slate"

import type { MarksOf } from "../text/TText"

/** Get the marks that would be added to text at the current selection. */
export const getMarks = <E extends Editor>(editor: E) =>
  Editor.marks(editor as any) as MarksOf<E> | null
