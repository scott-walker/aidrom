import type { ComponentProps } from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { type SelectContentProps } from "@radix-ui/react-select"
import {
  buildVariant,
  makeClasses,
  makeUiBaseClasses,
  makeUiClickableClasses,
  makeUiHoverableClasses,
  type RoundedVariant,
  type SizeVariant
} from "@lib/style-api"
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
  scheme?: "primary" | "soft" | "default"
  size?: SizeVariant
  rounded?: RoundedVariant
  onChangeValue?: (value: string) => void
}

/**
 * Компонент выбора (селект)
 * @namespace Shared.UI.Select
 */
export const Select = ({
  items,
  value,
  defaultValue,
  placeholder,
  className,
  scheme = "default",
  size = "default",
  rounded = "default",
  onChangeValue
}: SelectProps) => {
  const triggerClasses = buildVariant({
    beforeClasses: makeUiBaseClasses(makeUiHoverableClasses(makeUiClickableClasses())),
    afterClasses: makeClasses(
      "inline-flex",
      "align-center",
      "justify-between",
      "data-[state=open]:border-primary",
      "transition-colors",
      "duration-(--duration-default)",
      "w-max",
      "w-[170px]",
      className
    ),
    outlined: false,
    variant: {
      scheme,
      schemeHover: scheme,
      padding: size,
      textSize: size,
      rounded
    }
  })

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
