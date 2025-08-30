import type { ComponentProps, FC, ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { IconButton } from "@shared/ui/icon-button"

/**
 * Пропсы триггера инфобара
 * @namespace Shared.UI.InfobarCollapseTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для инфобара
 * @namespace Shared.UI.InfobarCollapseTrigger
 * @param {Props} props
 * @returns {ReactNode}
 */
export const InfobarCollapseTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isInfobarCollapsed, toggleInfobarCollapsedMode } = useLayout()
  const iconName = isInfobarCollapsed ? "arrow-left-to-line" : "arrow-right-to-line"

  return <IconButton icon={iconName} onClick={toggleInfobarCollapsedMode} {...props} />
}
