import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { useHover } from "@shared/hooks/use-hover"
import { IconButton } from "@shared/ui/icon-button"

/**
 * Пропсы триггера схлопывания сайдбара
 * @namespace Shared.UI.SidebarCollapseTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для схлопывания сайдбара
 * @namespace Shared.UI.SidebarCollapseTrigger
 */
export const SidebarCollapseTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { handlers } = useHover()
  const { isSidebarCollapsed, toggleSidebarCollapsedMode } = useLayout()

  const iconName = isSidebarCollapsed ? "arrow-left-to-line" : "arrow-right-to-line"

  return <IconButton icon={iconName} onClick={toggleSidebarCollapsedMode} {...props} {...handlers} />
}
