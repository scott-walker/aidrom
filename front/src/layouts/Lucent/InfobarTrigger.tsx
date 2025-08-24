import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { IconButton } from "@ui/IconButton"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы триггера инфобара
 * @namespace Layouts.Lucent.InfobarTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для инфобара
 * @namespace Layouts.Lucent.InfobarTrigger
 * @param {Props} props
 * @returns {ReactNode}
 */
export const InfobarTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { isInfobarVisible, toggleInfobarVisible } = useContext(LayoutContext) as ILayoutContext

  // Поскольку инфобар находится справа, то sidebar-open - это закрытие, а sidebar-close - это открытие
  const iconName = isInfobarVisible() ? "sidebar-open" : "sidebar-close"

  return (
    <div className="flex items-center justify-center">
      <IconButton icon={iconName} onClick={toggleInfobarVisible} {...props} />
    </div>
  )
}
