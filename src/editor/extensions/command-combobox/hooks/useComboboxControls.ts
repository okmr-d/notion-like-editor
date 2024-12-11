import React from "react"

import { useCombobox } from "downshift"

import { useComboboxStore } from "../combobox.store"

export type ComboboxControls = ReturnType<typeof useComboboxControls>

export const useComboboxControls = () => {
  const isOpen = useComboboxStore((s) => !!s.activeId)
  const highlightedIndex = useComboboxStore((s) => s.highlightedIndex)
  const filteredItems = useComboboxStore((s) => s.filteredItems)

  const { closeMenu, getInputProps, getItemProps, getMenuProps } = useCombobox({
    highlightedIndex,
    isOpen,
    items: filteredItems,
  })
  getMenuProps({}, { suppressRefError: true })
  getInputProps({}, { suppressRefError: true })

  return React.useMemo(
    () => ({
      closeMenu,
      getItemProps,
      getMenuProps,
    }),
    [closeMenu, getItemProps, getMenuProps]
  )
}
