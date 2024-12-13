import { AutoformatRule } from "./types"
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_HEADING_1,
  ELEMENT_HEADING_2,
  ELEMENT_HEADING_3,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@/editor/constants"

export const autoformatMarks: AutoformatRule[] = [
  {
    match: "***",
    mode: "mark",
    type: [MARK_BOLD, MARK_ITALIC],
  },
  {
    match: "__*",
    mode: "mark",
    type: [MARK_UNDERLINE, MARK_ITALIC],
  },
  {
    match: "__**",
    mode: "mark",
    type: [MARK_UNDERLINE, MARK_BOLD],
  },
  {
    match: "___***",
    mode: "mark",
    type: [MARK_UNDERLINE, MARK_BOLD, MARK_ITALIC],
  },
  {
    match: "**",
    mode: "mark",
    type: MARK_BOLD,
  },
  {
    match: "__",
    mode: "mark",
    type: MARK_UNDERLINE,
  },
  {
    match: "*",
    mode: "mark",
    type: MARK_ITALIC,
  },
  {
    match: "_",
    mode: "mark",
    type: MARK_ITALIC,
  },
  {
    match: "~~",
    mode: "mark",
    type: MARK_STRIKETHROUGH,
  },
  {
    match: "`",
    mode: "mark",
    type: MARK_CODE,
  },
]

export const autoformatBlocks: AutoformatRule[] = [
  {
    match: "# ",
    mode: "block",
    type: ELEMENT_HEADING_1,
  },
  {
    match: "## ",
    mode: "block",
    type: ELEMENT_HEADING_2,
  },
  {
    match: "### ",
    mode: "block",
    type: ELEMENT_HEADING_3,
  },
  {
    match: "| ",
    mode: "block",
    type: ELEMENT_BLOCKQUOTE,
  },
]

export const rules: AutoformatRule[] = [...autoformatMarks, ...autoformatBlocks]
