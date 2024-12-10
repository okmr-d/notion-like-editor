import type { Modify } from "../../types"

import {
  Editor,
  Element,
  Path,
  Transforms,
  removeNodes,
  withoutNormalizing,
  type Descendant,
} from "slate"

import type { QueryNodeOptions } from "../../types"
import type { NodeMatchOption } from "../../types/NodeMatchOption"

import { queryNode } from "../../utils"
import { getAboveNode, getEndPoint, isInline } from "../editor"
import { getNodeString } from "../node"

export type InsertNodesOptions = {
  /**
   * Insert the nodes after the currect block. Does not apply if the removeEmpty
   * option caused the current block to be removed.
   */
  nextBlock?: boolean

  /**
   * Remove the currect block if empty before inserting. Only applies to
   * paragraphs by default, but can be customized by passing a QueryNodeOptions
   * object.
   */
  removeEmpty?: QueryNodeOptions | boolean
} & Modify<
  NonNullable<Parameters<typeof Transforms.insertNodes>[2]>,
  NodeMatchOption<Editor>
>

/** Insert nodes at a specific location in the Editor. */
export const insertNodes = (
  editor: Editor,
  nodes: Descendant | Descendant[],
  { nextBlock, removeEmpty, ...options }: InsertNodesOptions = {}
) => {
  withoutNormalizing(editor as any, () => {
    if (removeEmpty) {
      const blockEntry = getAboveNode(editor, { at: options.at })

      if (blockEntry) {
        const queryNodeOptions: QueryNodeOptions =
          removeEmpty === true
            ? {
                allow: ["p"],
              }
            : removeEmpty

        const { filter } = queryNodeOptions

        queryNodeOptions.filter = ([node, path]) => {
          if (getNodeString(node)) return false

          const children = (node as Element).children

          if (children.some((n) => isInline(editor, n))) return false

          return !filter || filter([node, path])
        }

        if (queryNode(blockEntry, queryNodeOptions)) {
          removeNodes(editor as any, { at: blockEntry[1] })
          nextBlock = false
        }
      }
    }
    if (nextBlock) {
      const { at = editor.selection } = options

      if (at) {
        const endPoint = getEndPoint(editor, at)

        const blockEntry = getAboveNode(editor, {
          at: endPoint,
          block: true,
        })

        if (blockEntry) {
          options.at = Path.next(blockEntry[1])
        }
      }
    }

    Transforms.insertNodes(editor, nodes, options)
  })
}
