import { getNextNonDisabledIndex } from "./getNextNonDisabledIndex"

export const getNextWrappingIndex = (
  moveAmount: number,
  baseIndex: number,
  itemCount: number,
  getItemNodeFromIndex: any,
  circular = true
) => {
  if (itemCount === 0) {
    return -1
  }

  const itemsLastIndex = itemCount - 1

  // noinspection SuspiciousTypeOfGuard
  if (
    typeof baseIndex !== "number" ||
    baseIndex < 0 ||
    baseIndex >= itemCount
  ) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1
  }

  let newIndex = baseIndex + moveAmount

  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex
  }

  const nonDisabledNewIndex = getNextNonDisabledIndex(
    moveAmount,
    newIndex,
    itemCount,
    getItemNodeFromIndex,
    circular
  )

  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex
  }

  return nonDisabledNewIndex
}
