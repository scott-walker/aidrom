import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { useHover } from "@shared/hooks/use-hover"
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
  const { handlers } = useHover()
  const { isSidebarHidden, toggleSidebarVisibleMode } = useLayout()

  const iconName = isSidebarHidden ? "panel-left-open" : "panel-left-close"

  return <IconButton icon={iconName} onClick={toggleSidebarVisibleMode} {...props} {...handlers} />
}
