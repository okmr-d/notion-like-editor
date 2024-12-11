import React, { JSX, useEffect } from "react"
import { getOnSelectItem } from "./getOnSelectItem"
import { ADD_COMMANDS, AddCommandItemData } from "./commands"
import {
  SLASH_COMMAND_TRIGGER,
  ComboboxItemProps,
  ComboboxContentItemProps,
  ComboboxContentProps,
  ComboboxStoreById,
  TComboboxItem,
  useActiveComboboxStore,
  useComboboxContent,
  useComboboxContentState,
  useComboboxControls,
  useComboboxItem,
  TComboboxItemWithData,
  comboboxStore,
  useComboboxStore,
} from "../../extensions/command-combobox"
import {
  useFloating,
  flip,
  shift,
  autoUpdate,
  hide,
  FloatingPortal,
} from "@floating-ui/react"

import { cn } from "@/lib/utils"
import { ReactEditor, useSlateSelection, useSlateStatic } from "slate-react"

export function CommandCombobox({
  id,
  commandItems = ADD_COMMANDS,
}: {
  id: string
  commandItems?: TComboboxItemWithData<AddCommandItemData>[]
}) {
  const items = commandItems
  const storeItems = useComboboxStore((s) => s.items)
  const disabled = storeItems.length === 0 && !items?.length

  const combobox = useComboboxControls()
  const activeId = useComboboxStore((s) => s.activeId)
  const selection = useSlateSelection()

  useEffect(() => {
    comboboxStore.getState().setComboboxById({
      id,
      trigger: SLASH_COMMAND_TRIGGER,
      controlled: true,
      onSelectItem: getOnSelectItem,
      filter: (search) => (item) => {
        const searchLowerCase = search.toLowerCase()
        if (item.text.toLowerCase().startsWith(searchLowerCase)) {
          return true
        }
        console.log(item.data.keywords)
        return !!item.data.keywords?.some((keyword) =>
          keyword.startsWith(searchLowerCase)
        )
      },
    })
  }, [id, activeId])

  if (!combobox || !selection || activeId !== id || disabled) {
    return null
  }

  return (
    <FloatingPortal id="editor-container">
      <ComboboxContent
        combobox={combobox}
        items={items}
        onRenderItem={SlashCommandComboboxItem}
        component={({ store, filteredItems }) =>
          filteredItems.length === 0 ? (
            <div className="px-2.5 py-1 text-sm text-muted-foreground">
              結果がありません
            </div>
          ) : (
            <></>
          )
        }
      />
    </FloatingPortal>
  )
}

export function SlashCommandComboboxItem({
  item,
}: ComboboxItemProps<AddCommandItemData>): JSX.Element {
  const {
    text,
    data: { thumbnail, description },
  } = item

  return (
    <div className="flex items-center space-x-2.5">
      <div className="flex shrink-0 h-11 w-11 items-center justify-center rounded-sm border bg-white overflow-hidden">
        {thumbnail}
      </div>
      <div className="ml-2 truncate">
        <div className="text-sm">{text}</div>
        <div className="text-xs text-muted-foreground truncate">
          {description}
        </div>
      </div>
    </div>
  )
}

export function ComboboxItem({
  combobox,
  index,
  item,
  onRenderItem,
  className,
}: ComboboxContentItemProps<AddCommandItemData> & { className?: string }) {
  const { props } = useComboboxItem({ item, index, combobox, onRenderItem })
  return (
    <div
      className={cn(
        "relative cursor-pointer select-none overflow-hidden py-1 px-2.5 rounded-md outline-none",
        "data-[highlighted='true']:bg-accent",
        className
      )}
      {...props}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        comboboxStore.setState({
          highlightedIndex: index,
        })
      }}
    />
  )
}

export function ComboboxContent(
  props: Omit<ComboboxContentProps<AddCommandItemData>, "component"> & {
    component?: React.FC<{
      store: ComboboxStoreById
      filteredItems: TComboboxItem<AddCommandItemData>[]
    }>
    itemClassName?: string
    className?: string
  }
) {
  const {
    component: Component,
    items,
    combobox,
    onRenderItem,
    className,
    itemClassName,
  } = props

  const editor = useSlateStatic()

  const filteredItems = useComboboxStore(
    (s) => s.filteredItems
  ) as TComboboxItem<AddCommandItemData>[]
  const activeComboboxStore = useActiveComboboxStore()!

  const state = useComboboxContentState({ items, combobox })
  const { menuProps, targetRange } = useComboboxContent(state)

  const { refs, floatingStyles, middlewareData } = useFloating({
    open: true,
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [
      flip(),
      shift({
        padding: { top: 44 },
        crossAxis: true,
      }),
      hide(),
    ],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    if (!targetRange) {
      return
    }
    const domRange = ReactEditor.toDOMRange(editor, targetRange)

    if (!domRange) {
      return
    }

    refs.setReference({
      getBoundingClientRect: () => domRange.getBoundingClientRect(),
      getClientRects: () => domRange.getClientRects(),
    })
  }, [editor, refs, targetRange])

  return (
    <div
      ref={refs.setFloating}
      className="pointer-events-none py-3"
      style={{
        ...floatingStyles,
        ...(middlewareData.hide?.referenceHidden && { visibility: "hidden" }),
      }}
    >
      <div
        {...menuProps}
        className="pointer-events-auto w-[324px] max-h-80 overflow-y-auto p-1 border rounded-xl shadow-lg bg-background"
      >
        {Component
          ? Component({ store: activeComboboxStore, filteredItems })
          : null}

        {filteredItems.map((item, index) => (
          <React.Fragment key={item.key}>
            {filteredItems[index - 1]?.data.group !== item.data.group && (
              <div className="py-1.5 px-2.5 text-xs font-medium text-muted-foreground">
                {item.data.group}
              </div>
            )}
            <ComboboxItem
              item={item}
              combobox={combobox}
              index={index}
              onRenderItem={onRenderItem}
              className={itemClassName}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
