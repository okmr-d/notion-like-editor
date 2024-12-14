import { DndProvider as ReactDndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactDndProvider
      backend={TouchBackend}
      options={{
        enableMouseEvents: true,
      }}
    >
      {children}
    </ReactDndProvider>
  )
}
