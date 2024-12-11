import type React from "react"

import type {
  ComboboxItemProps,
  ComboboxState,
  ComboboxStateById,
  ComboboxStoreById,
  NoData,
} from ".."

export interface ComboboxProps<TData = NoData>
  extends Partial<Pick<ComboboxState<TData>, "items">>,
    ComboboxStateById<TData> {
  component?: React.FC<{ store: ComboboxStoreById }>
  disabled?: boolean
  onRenderItem?: React.FC<ComboboxItemProps<any>>
  portalElement?: HTMLElement
}
