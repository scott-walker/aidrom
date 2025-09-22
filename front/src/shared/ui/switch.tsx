import * as RadixSwitch from "@radix-ui/react-switch"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы
 * @namespace Shared.UI.Switch.Props
 */
export interface SwitchProps {
  disabled?: boolean
  checked?: boolean
  className?: string
  onChange?: (checked: boolean) => void
}

/**
 * Переключатель
 * @namespace Shared.UI.Switch
 */
export const Switch = ({ disabled, checked, onChange, className }: SwitchProps) => {
  const rootClasses = makeClasses(
    "flex",
    "items-center",
    "justify-start",
    "w-10",
    "h-6",
    "rounded-full",
    "bg-background-hard",
    "ring-2",
    "ring-transparent",
    "ring-offset-3",
    "ring-offset-background-soft",
    "transition-color",
    "duration-200",
    "ease-in-out",
    "hover:ring-foreground-soft",
    "data-[state=checked]:hover:ring-primary",
    "cursor-pointer",
    "select-none",
    className
  )
  const thumbClasses = makeClasses(
    "w-6",
    "h-6",
    "rounded-full",
    "bg-foreground-soft",
    "transition-transform",
    "duration-200",
    "ease-in-out",
    "data-[state=checked]:bg-primary",
    "data-[state=checked]:translate-x-4"
  )

  const handleChange = (checked: boolean) => {
    onChange?.(checked)
  }

  return (
    <RadixSwitch.Root disabled={disabled} checked={checked} onCheckedChange={handleChange} className={rootClasses}>
      <RadixSwitch.Thumb className={thumbClasses} />
    </RadixSwitch.Root>
  )
}
