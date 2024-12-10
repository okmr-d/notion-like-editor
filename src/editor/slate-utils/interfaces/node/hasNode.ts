import { type Path, Node } from "slate"

/** Check if a descendant node exists at a specific path. */
export const hasNode = (root: Node, path: Path) => Node.has(root, path)
