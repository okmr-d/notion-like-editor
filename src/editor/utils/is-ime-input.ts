import { KeyboardEvent } from "react"

// IME入力中か判定
// onCompositionStart と onKeydown の発火順がブラウザにより異なるため、 key や keyCode で判定している
export const isImeInputOnKeyDown = (event: KeyboardEvent) =>
  event.nativeEvent.isComposing ||
  event.key === "Process" ||
  event.keyCode === 229
