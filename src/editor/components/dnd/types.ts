export interface DragItemNode {
  id: string
  [key: string]: unknown
}

export type DropLineDirection = "" | "top" | "bottom"

export type DropDirection = "top" | "bottom" | undefined
