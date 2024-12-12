import { Editor, Range } from "slate"

import { comboboxStore } from "../combobox.store"
import { getTextFromTrigger } from "../utils/getTextFromTrigger"
import {
  KEY_COMMAND_BY_SLASH,
  KEY_COMMAND_BY_BUTTON,
  SLASH_COMMAND_TRIGGER,
} from "../constants"
import { isCollapsed, isPointAtWordEnd } from "../../../slate-utils"

export const onChangeCommandCombobox = (editor: Editor) => () => {
  const { selection } = editor

  if (
    comboboxStore.getState().activeId === KEY_COMMAND_BY_SLASH &&
    isCollapsed(selection)
  ) {
    const at = Range.start(selection!)

    // 現在のカーソル位置から前の "/" までのワードを取得
    const wordResult1 = getTextFromTrigger(editor, {
      at,
      trigger: SLASH_COMMAND_TRIGGER,
    })

    // ワードがあって、カーソル位置がワードの末尾なら、ワードをクエリとして設定
    if (wordResult1 && isPointAtWordEnd(editor, { at })) {
      comboboxStore.getState().open({
        activeId: KEY_COMMAND_BY_SLASH,
        text: wordResult1.textAfterTrigger,
        targetRange: wordResult1.range,
      })
      return
    }

    // 現在のカーソル位置から前の "；" までのワードを取得
    const wordResult2 = getTextFromTrigger(editor, {
      at,
      trigger: "；",
    })

    // ワードがあって、カーソル位置がワードの末尾なら、ワードをクエリとして設定
    if (wordResult2 && isPointAtWordEnd(editor, { at })) {
      comboboxStore.getState().open({
        activeId: KEY_COMMAND_BY_SLASH,
        text: wordResult2.textAfterTrigger,
        targetRange: wordResult2.range,
      })
      return
    }
  } else if (
    comboboxStore.getState().activeId === KEY_COMMAND_BY_BUTTON &&
    isCollapsed(selection)
  ) {
    const at = Range.start(selection!)

    // 現在のカーソル位置から前の "" までのワードを取得
    const wordResult = getTextFromTrigger(editor, {
      at,
      trigger: "",
    })

    // ワードがあって、カーソル位置がワードの末尾なら、ワードをクエリとして設定
    if (
      wordResult &&
      isPointAtWordEnd(editor, { at }) &&
      wordResult.textAfterTrigger !== "" // 文字列が空の場合は、コンボボックスを閉じる
    ) {
      comboboxStore.getState().open({
        activeId: KEY_COMMAND_BY_BUTTON,
        text: wordResult.textAfterTrigger,
        targetRange: wordResult.range,
      })
      return
    }
  }

  // それ以外の場合は、コンボボックスを閉じる
  if (comboboxStore.getState().activeId) {
    comboboxStore.getState().reset()
  }
}
