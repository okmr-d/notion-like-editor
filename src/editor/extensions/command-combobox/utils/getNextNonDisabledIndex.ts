export const getNextNonDisabledIndex = (
  moveAmount: number,
  baseIndex: number,
  itemCount: number,
  getItemNodeFromIndex: any,
  circular: boolean
): number => {
  const currentElementNode = getItemNodeFromIndex(baseIndex)

  if (!currentElementNode?.hasAttribute("disabled")) {
    return baseIndex
  }
  if (moveAmount > 0) {
    for (let index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index
      }
    }
  } else {
    for (let index = baseIndex - 1; index >= 0; index--) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index
      }
    }
  }
  if (circular) {
    return moveAmount > 0
      ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false)
      : getNextNonDisabledIndex(
          -1,
          itemCount - 1,
          itemCount,
          getItemNodeFromIndex,
          false
        )
  }

  return -1
}
