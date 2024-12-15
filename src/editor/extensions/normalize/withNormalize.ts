import { ELEMENT_PARAGRAPH, ELEMENT_TITLE } from "../../constants"
import { createElement } from "../../utils/createElement"
import { Editor, Node, Transforms, Path, Element, NodeEntry, Text } from "slate"

const rules: {
  path: Path
  strictType: Element["type"]
}[] = [
  // [0] の位置 title 要素にする
  { path: [0], strictType: "title" },
]

export const withNormalize = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (Editor.isEditor(currentNode)) {
      const endCurrentNormalizationPass = rules.some(({ path, strictType }) => {
        // rule の path に一致するノードを取得
        const node = Node.get(editor, path)

        if (node) {
          // ノードが存在する場合、node が type: strictType の要素でない場合、strictType に変換する
          if (
            strictType &&
            Element.isElement(node) &&
            node.type !== strictType
          ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, ...props } = createElement({
              type: strictType,
            })
            Transforms.setNodes(editor, props, {
              at: path,
            })

            return true
          }
        } else {
          // node が存在しない場合、type が strictType のノードを挿入する
          Transforms.insertNodes(editor, createElement({ type: strictType }), {
            at: path,
          })

          return true
        }

        return false
      })

      if (endCurrentNormalizationPass) {
        return
      }

      for (const [child, childPath] of Node.children(currentNode, [])) {
        // [0] 以外でtitle要素の場合は、paragraph要素に変換する
        if (
          Element.isElement(child) &&
          child.type == ELEMENT_TITLE &&
          !Path.equals(childPath, [0])
        ) {
          Transforms.setNodes(
            editor,
            {
              type: ELEMENT_PARAGRAPH,
            },
            {
              at: childPath,
            }
          )
          return
        }
      }
    }

    // title 要素チェック
    if (Element.isElement(currentNode)) {
      if (currentNode.type === ELEMENT_TITLE) {
        // title 要素は type と children のみ許可
        if (
          normalizeRedundantAttributes(
            editor,
            [currentNode, currentPath],
            ["id", "type", "children"]
          )
        ) {
          return
        }

        // title 要素の children は text のみ許可
        for (const [child, childPath] of Editor.nodes(editor, {
          at: currentPath,
          match: (n) => Text.isText(n),
        })) {
          if (
            normalizeRedundantAttributes(editor, [child, childPath], ["text"])
          ) {
            return
          }
        }
      }
    }

    return normalizeNode([currentNode, currentPath])
  }

  return editor
}

/**
 * allowedAttributes 以外の属性を削除する
 */
export const normalizeRedundantAttributes = (
  editor: Editor,
  [node, path]: NodeEntry,
  allowedAttributes: string[]
): boolean => {
  const attributes = Object.keys(node)
  const disallowedAttributes = attributes.filter(
    (attribute) => !allowedAttributes.includes(attribute)
  )

  if (disallowedAttributes.length === 0) {
    return false
  }

  const attributesToUnset = disallowedAttributes.reduce(
    (result, attribute) => ({
      ...result,
      [attribute]: undefined,
    }),
    {}
  )

  Transforms.setNodes(editor, attributesToUnset, { at: path })

  return true
}
