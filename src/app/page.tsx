import { Editor } from "@/editor"

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <div className="grow-0 shrink-0 bg-accent w-60"></div>
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-background h-11"></div>
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
