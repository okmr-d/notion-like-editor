import { Element } from "slate"

/** Check if a value is an array of `Element` objects. */
export const isElementList = (value: any): value is Element[] =>
  Element.isElementList(value)
