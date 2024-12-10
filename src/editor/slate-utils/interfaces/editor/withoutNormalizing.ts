import { Editor } from "slate"

/**
 * Call a function, deferring normalization until after it completes
 *
 * @returns True if normalized.
 */
export const withoutNormalizing = (
  editor: Editor,
  fn: () => boolean | void
) => {
  let normalized = false

  Editor.withoutNormalizing(editor as any, () => {
    normalized = !!fn()
  })

  return normalized
}
