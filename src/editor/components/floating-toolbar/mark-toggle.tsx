import { ReactNode } from "react"
import { useSlate } from "slate-react"
import { isMarkActive, toggleMark } from "../../utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip"
import { TogglableMarkKey } from "../../types"
import { Toggle } from "@radix-ui/react-toggle"
import { Button } from "../button"

export const MarkToggle = ({
  markKey,
  icon,
  tooltip,
}: {
  markKey: TogglableMarkKey
  icon: ReactNode
  tooltip: ReactNode
}) => {
  const editor = useSlate()
  return (
    <Tooltip>
      <Toggle
        onClick={() => toggleMark(editor, markKey)}
        pressed={isMarkActive(editor, markKey)}
        asChild
      >
        <TooltipTrigger asChild>
          <Button size="icon-sm">{icon}</Button>
        </TooltipTrigger>
      </Toggle>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
