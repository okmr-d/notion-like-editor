import { Icons } from "@/components/icons"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Button } from "@/components/ui/button"
import { Editor, TooltipProvider } from "@/editor"
import Link from "next/link"

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      {/* <div className="grow-0 shrink-0 bg-accent w-60"></div> */}
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex items-center px-4 h-11 border-b border-border bg-background">
          <div className="text-sm">Notion-like Editor</div>
          <div className="flex flex-1 items-center gap-2 justify-end">
            <nav className="flex items-center gap-0.5">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href="https://github.com/okmr-d/notion-like-editor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeSwitcher />
            </nav>
          </div>
        </div>
        <div
          id="editor-container"
          className="h-[calc(100vh-44px)] overflow-y-auto"
        >
          <Editor />
        </div>
      </div>
    </div>
  )
}
