import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
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
  const { isSidebarCollapsed, toggleSidebarCollapsedMode } = useLayout()
  const iconName = isSidebarCollapsed ? "panel-left-open" : "panel-left-close"

  return (
    <IconButton
      icon={iconName}
      iconSize={36}
      iconStrokeWidth={2}
      full={true}
      onClick={toggleSidebarCollapsedMode}
      {...props}
    />
  )
}
