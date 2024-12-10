import type { Descendant, Path, Range } from "slate"

export type TInsertNodeOperation<N extends Descendant = Descendant> = {
  [key: string]: unknown
  node: N
  path: Path
  type: "insert_node"
}

export type TInsertTextOperation = {
  [key: string]: unknown
  offset: number
  path: Path
  text: string
  type: "insert_text"
}

export type TMergeNodeOperation = {
  [key: string]: unknown
  path: Path
  position: number
  properties: object
  type: "merge_node"
}

export type TMoveNodeOperation = {
  [key: string]: unknown
  newPath: Path
  path: Path
  type: "move_node"
}

export type TRemoveNodeOperation<N extends Descendant = Descendant> = {
  [key: string]: unknown
  node: N
  path: Path
  type: "remove_node"
}

export type TRemoveTextOperation = {
  [key: string]: unknown
  offset: number
  path: Path
  text: string
  type: "remove_text"
}

export type TSetNodeOperation = {
  [key: string]: unknown
  newProperties: object
  path: Path
  properties: object
  type: "set_node"
}

export type TSetSelectionOperation =
  | {
      [key: string]: unknown
      newProperties: Partial<Range>
      properties: Partial<Range>
      type: "set_selection"
    }
  | {
      [key: string]: unknown
      newProperties: Range
      properties: null
      type: "set_selection"
    }
  | {
      [key: string]: unknown
      newProperties: null
      properties: Range
      type: "set_selection"
    }

export type TSplitNodeOperation = {
  [key: string]: unknown
  path: Path
  position: number
  properties: object
  type: "split_node"
}

export type TNodeOperation<N extends Descendant = Descendant> =
  | TInsertNodeOperation<N>
  | TMergeNodeOperation
  | TMoveNodeOperation
  | TRemoveNodeOperation<N>
  | TSetNodeOperation
  | TSplitNodeOperation

export type TSelectionOperation = TSetSelectionOperation

export type TTextOperation = TInsertTextOperation | TRemoveTextOperation

/**
 * `Operation` objects define the low-level instructions that Slate editors use
 * to apply changes to their internal state. Representing all changes as
 * operations is what allows Slate editors to easily implement history,
 * collaboration, and other features.
 */
export type TOperation<N extends Descendant = Descendant> =
  | TNodeOperation<N>
  | TSelectionOperation
  | TTextOperation
