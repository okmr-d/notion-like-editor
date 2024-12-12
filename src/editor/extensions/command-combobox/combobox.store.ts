import type { Range } from "slate"
import type { ComboboxOnSelectItem, NoData, TComboboxItem } from "./types"
import { createStore, StoreApi } from "zustand/vanilla"
import { useStore } from "zustand"

export type ComboboxStateById<TData = NoData> = {
  controlled?: boolean
  filter?: (search: string) => (item: TComboboxItem<TData>) => boolean
  id: string
  maxSuggestions?: number
  onSelectItem: ComboboxOnSelectItem<TData> | null
  searchPattern?: string
  sort?: (
    search: string
  ) => (a: TComboboxItem<TData>, b: TComboboxItem<TData>) => number
  trigger: string
}

export type ComboboxStoreById<TData = NoData> = StoreApi<
  ComboboxStateById<TData>
>

export type ComboboxState<TData = NoData> = {
  activeId: null | string
  byId: Record<string, ComboboxStoreById<TData>>
  filteredItems: TComboboxItem<TData>[]
  highlightedIndex: number
  items: TComboboxItem<TData>[]
  targetRange: Range | null
  text: null | string
}

const createComboboxStore = <TData = NoData>(state: ComboboxStateById<TData>) =>
  createStore<ComboboxStateById<TData>>((set) => ({
    ...state,
  }))

type ComboboxActions = {
  open: (
    state: Pick<ComboboxState, "activeId" | "targetRange" | "text">
  ) => void
  reset: () => void
  setComboboxById: <TData = NoData>(state: ComboboxStateById<TData>) => void
}

type ComboboxStore = ComboboxState & ComboboxActions

const defaultInitState: ComboboxState = {
  activeId: null,
  byId: {},
  filteredItems: [],
  highlightedIndex: 0,
  items: [],
  targetRange: null,
  text: null,
}

export const comboboxStore = createStore<ComboboxStore>((set) => ({
  ...defaultInitState,
  open: ({ activeId, targetRange, text }) => {
    document.body.setAttribute("data-combobox-open", "true")
    set(() => ({
      activeId,
      targetRange,
      text,
    }))
  },
  reset: () => {
    document.body.removeAttribute("data-combobox-open")
    set((state) => ({
      ...defaultInitState,
      byId: state.byId,
    }))
  },
  setComboboxById: (state) => {
    set((before) => ({
      byId: before.byId[state.id]
        ? { ...before.byId }
        : {
            ...before.byId,
            [state.id]: createComboboxStore(
              state as unknown as ComboboxStateById
            ),
          },
    }))
  },
}))

export const useComboboxStore = <T>(selector: (store: ComboboxStore) => T): T =>
  useStore(comboboxStore, selector)

export const getComboboxStoreById = (id: null | string) =>
  id ? comboboxStore.getState().byId[id] : null

export const useActiveComboboxStore = () => {
  const activeId = useStore(comboboxStore, (s) => s.activeId)
  const comboboxes = useStore(comboboxStore, (s) => s.byId)

  return activeId ? comboboxes[activeId] : null
}
