import type { ReactNode } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { type SelectContentProps } from "@radix-ui/react-select"
import { makeClasses, makeUiBox, makeUiClickable, makeUiHoverableAnimation, makeUiTransition } from "@lib/style-api"
import { ChevronDown } from "lucide-react"

/**
 * Значение пустого селекта
 * @namespace Shared.UI.Select.EMPTY_SELECT_VALUE
 */
export const EMPTY_SELECT_VALUE = "__NONE__"

/**
 * Тип значения селекта
 * @namespace Shared.UI.Select.Value
 */
export type SelectValue = string

/**
 * Тип элемента селекта
 * @namespace Shared.UI.Select.Item
 */
export type SelectItem = { label: string; value: SelectValue }

/**
 * Пропсы
 * @namespace Shared.UI.Select.Props
 */
export interface SelectProps {
  items: SelectItem[]
  value?: SelectValue | null
  defaultValue?: SelectValue | null
  hasEmpty?: boolean
  emptyLabel?: string
  placeholder?: string
  className?: string
  onChangeValue?: (value: SelectValue | null) => void
  renderItem?: (item: SelectItem) => ReactNode
  error?: boolean
  disabled?: boolean
}

/**
 * Компонент выбора (селект)
 * @namespace Shared.UI.Select
 */
export const Select = ({
  items,
  value,
  defaultValue,
  hasEmpty = false,
  emptyLabel = "Не выбрано",
  placeholder,
  onChangeValue,
  error,
  disabled,
  renderItem,
  className
}: SelectProps) => {
  placeholder = hasEmpty ? emptyLabel : placeholder

  const triggerClasses = makeClasses(
    makeUiBox(),
    makeUiClickable(),
    makeUiTransition(),
    makeUiHoverableAnimation(),

    "justify-between",
    "w-full",

    "bg-background",
    "text-soft-foreground",
    "fill-background",

    error ? "border-danger" : "border-background",
    error ? "hover:border-danger" : "hover:border-primary",
    error ? "data-[state=open]:border-danger" : "data-[state=open]:border-primary",

    className
  )
  const contentClasses = makeClasses(
    "py-2",
    "bg-background-soft",
    "dark:bg-background-hard",
    "fill-background-soft",
    "rounded-xl",
    "shadow-xs"
  )
  const contentProps: SelectContentProps = {
    className: contentClasses,
    position: "popper",
    sideOffset: 6,
    align: "center",
    style: {
      width: "calc(var(--radix-select-trigger-width) * 1.2)"
    }
  }
  const itemClasses = makeClasses("px-4", "py-1", "cursor-pointer", "hover:bg-background", "hover:text-foreground-hard")

  const handleChange = (value: SelectValue) => {
    onChangeValue?.(value === EMPTY_SELECT_VALUE ? null : value)
  }

  /**
   * Нормализует значение селекта
   * @param value - Значение селекта
   * @returns Нормализованное значение селекта
   */
  const normalizeValue = (value: SelectValue | null | undefined): string | undefined => {
    if (hasEmpty) {
      return value === null ? EMPTY_SELECT_VALUE : value
    }

    return value || undefined
  }

  return (
    <RadixSelect.Root
      value={normalizeValue(value)}
      defaultValue={normalizeValue(defaultValue)}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger className={triggerClasses}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content {...contentProps}>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>
            {hasEmpty && (
              <>
                <RadixSelect.Item value={EMPTY_SELECT_VALUE} key={EMPTY_SELECT_VALUE} className={itemClasses}>
                  <RadixSelect.ItemText>{emptyLabel}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator />
                </RadixSelect.Item>
                <RadixSelect.Separator />
              </>
            )}
            {items.map(({ label, value }) => (
              <RadixSelect.Item value={value} key={value} className={itemClasses}>
                <RadixSelect.ItemText>{renderItem ? renderItem({ label, value }) : label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            ))}
            <RadixSelect.Separator />
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Arrow width={12} height={7} />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
