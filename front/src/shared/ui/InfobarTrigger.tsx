import type { ComponentProps, FC, ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { useLayout } from "@packages/Lucent"

/**
 * Пропсы триггера инфобара
 * @namespace Lucent.InfobarTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для инфобара
 * @namespace Lucent.InfobarTrigger
 * @param {Props} props
 * @returns {ReactNode}
 */
export const InfobarTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isInfobarVisible, toggleInfobarMode } = useLayout()

  // Поскольку инфобар находится справа, то sidebar-open - это закрытие, а sidebar-close - это открытие
  const iconName = isInfobarVisible() ? "sidebar-open" : "sidebar-close"

  return <IconButton circle icon={iconName} onClick={toggleInfobarMode} {...props} />
}
