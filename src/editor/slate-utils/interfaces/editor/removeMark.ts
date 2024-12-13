import castArray from "lodash/castArray.js"
import { Editor, EditorMarks, Range } from "slate"
import { SetNodesOptions, unsetNodes } from "../transforms"
import { getMarks } from "./getMarks"
import { RichText } from "@/editor/types"
import { isText } from "../text"

export interface RemoveMarkOptions<E extends Editor>
  extends Omit<SetNodesOptions<E>, "match" | "split"> {
  /** Mark or the array of marks that will be removed */
  key: (keyof EditorMarks)[] | keyof EditorMarks

  /** Range where the mark(s) will be removed */
  at?: Range

  /**
   * When location is not a Range, setting this to false can prevent the
   * onChange event of the editor to fire
   *
   * @default true
   */
  shouldChange?: boolean
}

/** Remove mark and trigger `onChange` if collapsed selection. */
export const removeMark = <E extends Editor>(
  editor: E,
  { key, at, shouldChange = true, ...rest }: RemoveMarkOptions<E>
) => {
  const selection = at ?? editor.selection
  key = castArray<keyof EditorMarks>(key)

  if (selection) {
    if (Range.isRange(selection) && Range.isExpanded(selection)) {
      unsetNodes<RichText>(editor, key, {
        at: selection,
        match: isText,
        split: true,
        ...rest,
      })
    } else if (editor.selection) {
      const marks: any = getMarks(editor) ?? {}
      key.forEach((k) => {
        delete marks[k]
      })
      editor.marks = marks
      shouldChange && editor.onChange()
    }
  }
}
