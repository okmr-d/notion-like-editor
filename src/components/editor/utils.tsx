import { RichText } from "./types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isText = (value: any): value is { text: string } => {
  return typeof value.text === "string"
}

export const isRichText = (
  value: { text: string } & unknown
): value is RichText => {
  return Object.keys(value).length > 1
}
