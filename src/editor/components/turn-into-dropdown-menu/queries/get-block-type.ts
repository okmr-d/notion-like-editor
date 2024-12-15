import { Element } from "slate"

export const getBlockType = (block: Element) => {
  // if (block[IndentListPlugin.key]) {
  //   if (block[IndentListPlugin.key] === ListStyleType.Decimal) {
  //     return ListStyleType.Decimal;
  //   } else if (block[IndentListPlugin.key] === INDENT_LIST_KEYS.todo) {
  //     return INDENT_LIST_KEYS.todo;
  //   } else {
  //     return ListStyleType.Disc;
  //   }
  // }

  return block.type
}
