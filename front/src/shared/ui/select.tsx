import type { ComponentProps } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { type SelectContentProps } from "@radix-ui/react-select"
import { makeClasses, makeUiBox, makeUiClickable, makeUiHoverableAnimation, makeUiTransition } from "@lib/style-api"
import { ChevronDown } from "lucide-react"

/**
 * Пропсы
 * @namespace Shared.UI.Select.Props
 */
export type SelectProps = Omit<ComponentProps<"select">, "size"> & {
  items: { label: string; value: string }[]
  value?: string | undefined | null
  defaultValue?: string | undefined
  placeholder?: string
  className?: string
  onChangeValue?: (value: string) => void
}

/**
 * Компонент выбора (селект)
 * @namespace Shared.UI.Select
 */
export const Select = ({ items, value, defaultValue, placeholder, className, onChangeValue }: SelectProps) => {
  const triggerClasses = makeClasses(
    makeUiBox(),
    makeUiClickable(),
    makeUiTransition(),
    makeUiHoverableAnimation(),

    "data-[state=open]:border-primary",
    "hover:border-primary",

    "w-max",
    "w-min-[170px]",

    "bg-background",
    "border-background",
    "text-soft-foreground",
    "fill-background",
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

  return (
    <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onChangeValue}>
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
            {items.map(({ label, value }) => (
              <RadixSelect.Item value={value} key={value} className={itemClasses}>
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            ))}

            {/* <RadixSelect.Group>
              <RadixSelect.Label />
              {items.map(({ label, value }) => (
                <RadixSelect.Item value={value}>
                  <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator />
                </RadixSelect.Item>
              ))}
            </RadixSelect.Group> */}

            <RadixSelect.Separator />
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Arrow width={12} height={7} />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
