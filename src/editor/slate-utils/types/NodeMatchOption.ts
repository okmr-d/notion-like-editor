import type { Editor } from "slate"
import type { NodeOf, TNodeMatch } from "../interfaces/node/TNode"

export interface NodeMatchOption<E extends Editor> {
  match?: TNodeMatch<NodeOf<E>>
}
