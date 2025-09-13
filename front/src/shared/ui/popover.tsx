import type { ReactNode } from "react"
import * as BasePopover from "@radix-ui/react-popover"
import { makeClasses } from "@lib/style-api"
// import { Icon } from "@ui/icon"

/**
 * Пропсы для компонента Popover
 * @namespace Shared.Ui.Popover.Props
 */
type PopoverProps = {
  trigger: ReactNode
  children: ReactNode
  className?: string
  open?: boolean | undefined
  onOpenChange?: (open: boolean) => void
}

/**
 * Компонент Popover
 * @namespace Shared.Ui.Popover
 */
export const Popover = ({ children, trigger, className = "", open, onOpenChange }: PopoverProps) => {
  const contentClasses = makeClasses("relative", "bg-background-soft", "rounded-lg", "p-4", "shadow-lg", className)
  // const closeClasses = makeClasses("absolute", "top-2", "right-2", "cursor-pointer", "hover:text-primary")
  const arrowClasses = makeClasses("fill-background-soft")

  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange}>
      <BasePopover.Trigger asChild>{trigger}</BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Content className={contentClasses} sideOffset={5}>
          {children}

          {/* <BasePopover.Close className={closeClasses} aria-label="Close">
            <Icon name="x" />
          </BasePopover.Close> */}
          <BasePopover.Arrow className={arrowClasses} />
        </BasePopover.Content>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}
