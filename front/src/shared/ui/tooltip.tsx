import { type ReactNode } from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тултипа
 * @namespace Shared.UI.Tooltip.TooltipProps
 */
type TooltipProps = {
  children: ReactNode
  text: string
  side?: "top" | "bottom" | "left" | "right"
  offset?: number
  delay?: number
}

/**
 * Тултип
 * @namespace Shared.UI.Tooltip
 */
export const Tooltip = ({ children, text, side = "bottom", offset = 5, delay = 100 }: TooltipProps) => {
  const contentClasses = makeClasses(
    "py-1",
    "px-5",
    "rounded-lg",
    "bg-foreground",
    "text-background-soft",
    "dark:bg-primary",
    "dark:text-primary-foreground"
  )
  const arrowClasses = makeClasses("fill-foreground", "dark:fill-primary")

  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className={contentClasses} sideOffset={offset} side={side}>
            {text}
            <RadixTooltip.Arrow className={arrowClasses} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
