import { Editor, Node, NodeEntry, Descendant, Element } from "slate"
import castArray from "lodash/castArray"
import cloneDeep from "lodash/cloneDeep"
import { generateId, queryNode, someNode } from "../../slate-utils"
import { applyDeepToNodes, defaultsDeepToNodes } from "../../utils"

export const withNodeId = (editor: Editor) => {
  const { apply, insertNode, insertNodes } = editor

  editor.insertNodes = (_nodes, options) => {
    const nodes = castArray<Node>(_nodes as any).filter((node) => !!node)

    if (nodes.length === 0) return

    insertNodes(
      nodes.map((node: any) => {
        if (node.id) {
          node._id = node.id
        }

        return node
      }),
      options
    )
  }

  editor.insertNode = (node: any) => {
    if (node.id) {
      node._id = node.id
    }

    insertNode(node)
  }

  editor.apply = (operation) => {
    const query = {
      filter: (nodeEntry: any) => {
        return nodeEntry[0]?.type !== undefined
      },
    }

    if (operation.type === "insert_node") {
      // clone to be able to write (read-only)
      const node = cloneDeep(operation.node)

      // Delete ids from node that are already being used
      applyDeepToNodes({
        apply: (node) => {
          delete (node as any).id
        },
        node,
        query,
        source: {},
      })

      defaultsDeepToNodes({
        node,
        path: operation.path,
        query,
        source: {
          id: generateId(),
        },
      })

      applyDeepToNodes({
        apply: (node: any) => {
          if (!!node._id) {
            const id = node._id
            delete node._id

            if (!someNode(editor, { at: [], match: { id } })) {
              node.id = id
            }
          }
        },
        node,
        query,
        source: {},
      })

      return apply({
        ...operation,
        node,
      })
    }
    if (operation.type === "split_node") {
      const node = operation.properties as Node

      let id = (operation.properties as any).id

      if (queryNode([node, operation.path], query)) {
        id = generateId()

        return apply({
          ...operation,
          properties: {
            ...operation.properties,
            id,
          },
        })
      }
      // if the node is allowed, we don't want to use the same id
      if (id) {
        delete (operation.properties as any).id
      }
    }

    return apply(operation)
  }

  return editor
}
