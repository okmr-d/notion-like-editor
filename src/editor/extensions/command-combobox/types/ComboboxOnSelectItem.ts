import { Editor } from "slate"

export interface TComboboxItemBase {
  key: string
  text: string
  disabled?: boolean
}

export interface TComboboxItemWithData<TData extends Data>
  extends TComboboxItemBase {
  data: TData
}

export type NoData = undefined

export type Data = unknown

export type TComboboxItem<TData = NoData> = TData extends NoData
  ? TComboboxItemBase
  : TComboboxItemWithData<TData>

export type ComboboxOnSelectItem<TData> = (
  editor: Editor,
  item: TComboboxItem<TData>
) => any
