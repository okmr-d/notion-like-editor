import { Editor, Node, Element, NodeEntry } from "slate"
import cloneDeep from "lodash/cloneDeep.js"
import { generateId, queryNode, someNode } from "../../slate-utils"
import { applyDeepToNodes, defaultsDeepToNodes } from "../../utils"

export const withNodeId = (editor: Editor) => {
  const { apply, insertNode, insertNodes } = editor

  editor.insertNodes = (nodeOrNodes, options) => {
    const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes]

    if (nodes.length === 0) return

    insertNodes(
      nodes.map((node) => {
        if (Element.isElement(node)) {
          node._id = node.id
        }
        return node
      }),
      options
    )
  }

  editor.insertNode = (node) => {
    if (Element.isElement(node)) {
      node._id = node.id
    }

    insertNode(node)
  }

  editor.apply = (operation) => {
    const query = {
      filter: (nodeEntry: NodeEntry) => Element.isElement(nodeEntry[0]),
    }

    if (operation.type === "insert_node") {
      // clone to be able to write (read-only)
      const node = cloneDeep(operation.node)

      // すでに使用されているノードのIDを削除
      applyDeepToNodes({
        apply: (node) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        source: () => ({
          id: generateId(),
        }),
      })

      applyDeepToNodes({
        apply: (node) => {
          if (Element.isElement(node) && node._id) {
            const id = node._id
            delete node._id

            if (!someNode(editor, { at: [], match: { id: id } })) {
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
      const node = operation.properties

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let id = (operation.properties as any).id

      // only for elements (node with a type) or all nodes if `filterText=false`
      if (queryNode([node as Node, operation.path], query)) {
        id = generateId()

        return apply({
          ...operation,
          properties: {
            ...operation.properties,
            id: id,
          },
        })
      }
      // if the node is allowed, we don't want to use the same id
      if (id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (operation.properties as any).id
      }
    }

    return apply(operation)
  }

  return editor
}
