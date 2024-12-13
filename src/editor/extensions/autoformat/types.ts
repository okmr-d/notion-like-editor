import { Editor, Element } from "slate"
import type { GetMatchPointsReturnType } from "./utils"

export interface MatchRange {
  end: string
  start: string
}

export interface AutoformatQueryOptions
  extends Omit<AutoformatCommonRule, "query"> {
  text: string
}

export interface AutoformatCommonRule {
  match: MatchRange | MatchRange[] | string[] | string
  insertTrigger?: boolean
  query?: (editor: Editor, options: AutoformatQueryOptions) => boolean
  trigger?: string[] | string
}

export interface AutoformatBlockRule extends AutoformatCommonRule {
  match: string[] | string
  mode: "block"
  allowSameTypeAbove?: boolean
  format?: (editor: Editor) => void
  matchByRegex?: boolean
  preFormat?: (editor: Editor) => void
  triggerAtBlockStart?: boolean
  type?: Element["type"]
}

export interface AutoformatMarkRule extends AutoformatCommonRule {
  mode: "mark"
  type: string[] | string
  ignoreTrim?: boolean
}

export interface AutoformatTextRule extends AutoformatCommonRule {
  format:
    | ((editor: Editor, options: GetMatchPointsReturnType) => void)
    | string[]
    | string
  match: string[] | string
  mode: "text"
}

export type AutoformatRule =
  | AutoformatBlockRule
  | AutoformatMarkRule
  | AutoformatTextRule

export interface AutoformatPluginOptions {
  enableUndoOnDelete?: boolean
  /** A list of triggering rules. */
  rules?: AutoformatRule[]
}
