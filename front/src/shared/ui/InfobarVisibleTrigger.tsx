import type { ComponentProps, FC, ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { useLayout } from "@packages/Lucent"

/**
 * Пропсы триггера инфобара
 * @namespace Shared.UI.InfobarVisibleTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для инфобара
 * @namespace Shared.UI.InfobarVisibleTrigger
 * @param {Props} props
 * @returns {ReactNode}
 */
export const InfobarVisibleTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isInfobarHidden, toggleInfobarVisibleMode } = useLayout()

  // Поскольку инфобар находится справа, то sidebar-open - это закрытие, а sidebar-close - это открытие
  const iconName = isInfobarHidden() ? "sidebar-close" : "sidebar-open"

  return <IconButton icon={iconName} onClick={toggleInfobarVisibleMode} {...props} />
}
