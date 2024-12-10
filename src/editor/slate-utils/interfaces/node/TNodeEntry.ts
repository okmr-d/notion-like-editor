import type { Editor, Node, NodeEntry } from "slate"
import type { ElementOf } from "../element/TElement"
import type { TextOf } from "../text/TText"
import type { AncestorOf } from "./TAncestor"
import type { ChildOf, DescendantOf } from "./TDescendant"
import type { NodeOf } from "./TNode"

/** Node entry from an editor. */
export type NodeEntryOf<E extends Editor> = NodeEntry<NodeOf<E>>

/** Element entry from a node. */
export type TElementEntry<N extends Node = Node> = NodeEntry<ElementOf<N>>

/** Element entry of a value. */
export type ElementEntryOf<E extends Editor> = NodeEntry<ElementOf<E>>

/** Text node entry from a node. */
export type TTextEntry<N extends Node = Node> = NodeEntry<TextOf<N>>

/** Text node entry of a value. */
export type TextEntryOf<E extends Editor> = NodeEntry<TextOf<E>>

/** Ancestor entry from a node. */
export type TAncestorEntry<N extends Node = Node> = NodeEntry<AncestorOf<N>>

/** Ancestor entry from an editor. */
export type AncestorEntryOf<E extends Editor> = TAncestorEntry<E>

/** Descendant entry from a node. */
export type TDescendantEntry<N extends Node> = NodeEntry<DescendantOf<N>>

/** Descendant entry of a value. */
export type DescendantEntryOf<E extends Editor> = NodeEntry<DescendantOf<E>>

/** Child node entry from a node. */
export type TNodeChildEntry<N extends Node = Node> = NodeEntry<ChildOf<N>>
