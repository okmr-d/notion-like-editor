import React from "react"

import type { ComboboxProps } from "../types/ComboboxProps"

import {
  type ComboboxControls,
  comboboxStore,
  type Data,
  type NoData,
  useActiveComboboxStore,
  useComboboxStore,
} from ".."
import { useStore } from "zustand"

export type ComboboxContentProps<TData extends Data = NoData> = {
  combobox: ComboboxControls
} & Omit<
  ComboboxProps<TData>,
  | "controlled"
  | "filter"
  | "id"
  | "maxSuggestions"
  | "onSelectItem"
  | "searchPattern"
  | "sort"
  | "trigger"
>

export type ComboboxContentRootProps<TData extends Data = NoData> = {
  combobox: ComboboxControls
} & ComboboxContentProps<TData>

export const useComboboxContentState = <TData extends Data = NoData>({
  combobox,
  items,
}: ComboboxContentRootProps<TData>) => {
  const targetRange = useComboboxStore((s) => s.targetRange)
  const text = useComboboxStore((s) => s.text ?? "")
  const storeItems = useComboboxStore((s) => s.items)

  const activeComboboxStore = useActiveComboboxStore()!
  const filter = useStore(activeComboboxStore, (s) => s.filter)
  const sort = useStore(activeComboboxStore, (s) => s.sort)
  const maxSuggestions =
    useStore(activeComboboxStore, (s) => s.maxSuggestions) ?? storeItems.length

  // Update items
  React.useEffect(() => {
    if (items) {
      comboboxStore.setState({
        items,
      })
    }
  }, [items])

  // Filter items
  React.useEffect(() => {
    comboboxStore.setState({
      filteredItems: storeItems
        .filter(
          filter
            ? filter(text)
            : (value) => value.text.toLowerCase().startsWith(text.toLowerCase())
        )
        .sort(sort?.(text))
        .slice(0, maxSuggestions),
    })
  }, [filter, sort, storeItems, maxSuggestions, text])

  return {
    combobox,
    targetRange,
  }
}

export const useComboboxContent = (
  state: ReturnType<typeof useComboboxContentState>
) => {
  const menuProps = state.combobox
    ? state.combobox.getMenuProps({}, { suppressRefError: true })
    : { ref: null }

  return {
    menuProps,
    targetRange: state.targetRange,
  }
}
