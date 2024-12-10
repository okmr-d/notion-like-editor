import { Element } from "slate"

/**
 * Check if an element matches set of properties.
 *
 * Note: this checks custom properties, and it does not ensure that any children
 * are equivalent.
 */
export const elementMatches = (element: Element, props: object) =>
  Element.matches(element, props)
