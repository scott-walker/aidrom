import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { Button } from "@ui/Button"
import { Icon } from "@ui/Icon"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы триггера инфобара
 * @namespace Layouts.Lucent.InfobarTrigger.Props
 */
type Props = ComponentProps<"button">

/**
 * Триггер для инфобара
 * @namespace Layouts.Lucent.InfobarTrigger
 * @returns {ReactNode}
 */
export const InfobarTrigger: FC<Props> = ({ ...props }: Props): ReactNode => {
  const { infobarCollapsed, setInfobarCollapsed } = useContext(LayoutContext) as ILayoutContext

  const toggleInfobarCollapsed = (): void => setInfobarCollapsed(!infobarCollapsed)

  return (
    <Button variant="hard" onClick={toggleInfobarCollapsed} {...props}>
      <Icon name="info" size={24} strokeWidth={3} />
      {infobarCollapsed ? "Развернуть" : "Свернуть"}
    </Button>
  )
}
