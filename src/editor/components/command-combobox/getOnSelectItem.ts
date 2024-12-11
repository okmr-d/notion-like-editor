import {
  deleteText,
  getAboveNode,
  isAncestorEmpty,
  isElement,
  isExpanded,
  withoutNormalizing,
} from "../../slate-utils"
import {
  comboboxStore,
  ComboboxOnSelectItem,
} from "../../extensions/command-combobox"
import {
  AddCommandItemData,
  AddCommandKey,
  executeAddCommand,
} from "./commands"
import { ELEMENT_PARAGRAPH } from "@/editor/constants"
import { HistoryEditor } from "slate-history"

export const getOnSelectItem: ComboboxOnSelectItem<AddCommandItemData> = (
  editor,
  item
) => {
  const targetRange = comboboxStore.getState().targetRange
  if (!targetRange) return

  withoutNormalizing(editor, () => {
    if (isExpanded(targetRange)) {
      HistoryEditor.withoutMerging(editor, () => {
        deleteText(editor, { at: targetRange })
      })
    }

    const currentElementEntry = getAboveNode(editor, {
      block: true,
    })!
    const shouldToggle =
      isElement(currentElementEntry[0]) &&
      currentElementEntry[0].type === ELEMENT_PARAGRAPH &&
      isAncestorEmpty(editor, currentElementEntry[0])

    executeAddCommand[item.key as AddCommandKey](
      editor,
      shouldToggle,
      currentElementEntry
    )
  })

  return comboboxStore.getState().reset()
}
