import { Editor } from "slate"

export interface ResetNodePluginRule {
  predicate: (editor: Editor) => boolean
  types: string[]
  defaultType?: string
  hotkey: string[] | string
  onReset?: (editor: Editor) => void
}
