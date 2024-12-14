import { RenderLeafProps } from "slate-react"

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <span className="font-bold">{children}</span>
  }

  if (leaf.italic) {
    children = <span className="italic">{children}</span>
  }

  if (leaf.underline) {
    children = <span className="underline">{children}</span>
  }

  if (leaf.strikethrough) {
    children = <span className="line-through">{children}</span>
  }

  if (leaf.code) {
    children = (
      <code className="font-mono text-[#EB5757] bg-accent rounded py-[.2em] px-[.4em] text-[85%]">
        {children}
      </code>
    )
  }

  return <span {...attributes}>{children}</span>
}
