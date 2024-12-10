import { Element } from "slate"

/** Check if a value implements the 'Element' interface. */
export const isElement = (value: any): value is Element =>
  Element.isElement(value)
