import { QueryNodeOptions } from "../../slate-utils"

export interface ExitBreakRule {
  hotkey: string
  query?: {
    end?: boolean
    start?: boolean
  } & QueryNodeOptions
  before?: boolean
  level?: number
  relative?: boolean
}
