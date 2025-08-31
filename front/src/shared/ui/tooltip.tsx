import { type ReactNode } from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"

/**
 * Тултип
 * @namespace Shared.UI.Tooltip
 * @description Компонент подсказки (tooltip)
 * @param {ReactNode} children - Содержимое для отображения в подсказке
 */
export const Tooltip = ({ target, children }: { target: ReactNode; children: ReactNode }) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{target}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="py-1 px-5 rounded-lg bg-foreground text-background-soft" sideOffset={5}>
            {children}
            <RadixTooltip.Arrow className="fill-foreground" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
