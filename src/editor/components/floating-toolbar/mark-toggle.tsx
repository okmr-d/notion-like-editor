import { ReactNode } from "react"
import { useSlate } from "slate-react"
import { isMarkActive, toggleMark } from "../../utils"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../tooltip"
import { TogglableMarkKey } from "../../types"
import { Toggle } from "@radix-ui/react-toggle"

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
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <Toggle
          onClick={() => toggleMark(editor, markKey)}
          pressed={isMarkActive(editor, markKey)}
          className="select-none flex size-7 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          asChild
        >
          <TooltipTrigger>{icon}</TooltipTrigger>
        </Toggle>
        <TooltipContent sideOffset={10}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
