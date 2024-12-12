import { Editor, Element } from "slate"
import isHotkey from "is-hotkey"
import { getComboboxStoreById, comboboxStore } from "../combobox.store"
import { getNextWrappingIndex } from "../utils/getNextWrappingIndex"

import { KEY_COMMAND_BY_SLASH, SLASH_COMMAND_TRIGGER } from "../constants"
import { isImeInputOnKeyDown } from "../../../utils/is-ime-input"
import {
  getAboveNode,
  getNodeString,
  isCollapsed,
  isElement,
} from "../../../slate-utils"
import { Hotkeys } from "../../../utils/hotkeys"
import { ELEMENT_TITLE } from "@/editor/constants"

export const onKeyDownCommandCombobox =
  (editor: Editor) => (event: React.KeyboardEvent) => {
    // "/", "；" が押されたとき、条件を満たしていればメニューを開く
    if (
      ((!isImeInputOnKeyDown(event) &&
        isHotkey(SLASH_COMMAND_TRIGGER, { byKey: true }, event)) ||
        (isImeInputOnKeyDown(event) &&
          isHotkey(";", { byKey: true }, event))) &&
      shouldShow(editor)
    ) {
      comboboxStore.getState().open({
        activeId: KEY_COMMAND_BY_SLASH,
        text: "",
        targetRange: editor.selection,
      })
      return
    }

    const { activeId, filteredItems, highlightedIndex } =
      comboboxStore.getState()
    const isOpen = !!activeId

    if (!isOpen) return

    const store = getComboboxStoreById(activeId)

    if (!store) return

    const onSelectItem = store.getState()?.onSelectItem

    if (isHotkey("down", event)) {
      event.preventDefault()

      const newIndex = getNextWrappingIndex(
        1,
        highlightedIndex,
        filteredItems.length,
        () => {},
        true
      )
      comboboxStore.setState({
        highlightedIndex: newIndex,
      })

      return
    }
    if (isHotkey("up", event)) {
      event.preventDefault()

      const newIndex = getNextWrappingIndex(
        -1,
        highlightedIndex,
        filteredItems.length,
        () => {},
        true
      )
      comboboxStore.setState({
        highlightedIndex: newIndex,
      })

      return
    }
    if (isHotkey("escape", event)) {
      event.preventDefault()
      comboboxStore.getState().reset()

      return
    }
    if (Hotkeys.isTab(editor, event) || isHotkey("enter", event)) {
      event.preventDefault()
      event.stopPropagation()

      if (filteredItems[highlightedIndex]) {
        onSelectItem?.(editor, filteredItems[highlightedIndex]!)
      }
    }
  }

const shouldShow: (editor: Editor) => boolean = (editor) => {
  if (!isCollapsed(editor.selection)) {
    return false
  }

  const currentNodeEntry = getAboveNode<Element>(editor, {
    match: (n) => isElement(n),
  })

  if (!currentNodeEntry) {
    return false
  }
  const currentNode = currentNodeEntry[0]

  if (currentNode.type === ELEMENT_TITLE) {
    return false
  }

  const text = getNodeString(currentNode).trim()
  return text === ""
}
