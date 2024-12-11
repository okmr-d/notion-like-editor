import type { ComboboxContentProps } from "./useComboboxContent"
import {
  type ComboboxControls,
  type Data,
  type NoData,
  type TComboboxItem,
  comboboxStore,
  getComboboxStoreById,
  useComboboxStore,
} from ".."
import { useSlateStatic } from "slate-react"

export type ComboboxContentItemProps<TData extends Data = NoData> = {
  combobox: ComboboxControls
  index: number
  item: TComboboxItem<TData>
} & Pick<ComboboxContentProps<TData>, "onRenderItem">

export interface ComboboxItemProps<TData extends Data = NoData> {
  item: TComboboxItem<TData>
  search: string
}

export const useComboboxItem = <TData extends Data = NoData>({
  combobox,
  index,
  item,
  onRenderItem,
}: ComboboxContentItemProps<TData>) => {
  const editor = useSlateStatic()
  const text = useComboboxStore((s) => s.text ?? "")
  const highlightedIndex = useComboboxStore((s) => s.highlightedIndex)

  const Item = onRenderItem
    ? onRenderItem({ item: item as TComboboxItem<TData>, search: text })
    : item.text

  const highlighted = index === highlightedIndex

  return {
    props: {
      "data-highlighted": highlighted,
      ...combobox.getItemProps({
        index,
        item,
      }),
      children: Item,
      onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()

        const onSelectItem = getComboboxStoreById(
          comboboxStore.getState().activeId
        )?.getState().onSelectItem

        onSelectItem?.(editor, item)
      },
    },
  }
}
