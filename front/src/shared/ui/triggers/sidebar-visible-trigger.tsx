import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"

/**
 * Пропсы триггера сайдбара
 * @namespace Shared.UI.SidebarVisibleTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для сайдбара
 * @namespace Shared.UI.SidebarVisibleTrigger
 */
export const SidebarVisibleTrigger: FC<Props> = ({ ...props }): ReactNode => {
  const { isSidebarHidden, toggleSidebarVisibleMode } = useLayout()
  const iconName = isSidebarHidden ? "panel-left-open" : "panel-left-close"

  return (
    <IconButton
      icon={iconName}
      iconSize={36}
      iconStrokeWidth={2}
      full={true}
      onClick={toggleSidebarVisibleMode}
      {...props}
    />
  )
}
