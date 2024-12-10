import { Editor } from "slate"

/** Check if a value is an `Editor` object. */
export const isEditor = (value: any): value is Editor => Editor.isEditor(value)
