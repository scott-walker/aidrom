import { useContext, type FC, type ReactNode } from "react"
import { Button } from "@ui/Button"
import { Icon } from "@ui/Icon"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Триггер для инфобара
 * @namespace Layouts.Lucent.InfobarTrigger
 * @returns {ReactNode}
 */
export const InfobarTrigger: FC = (): ReactNode => {
  const { infobarCollapsed, setInfobarCollapsed } = useContext(LayoutContext) as ILayoutContext

  const toggleInfobarCollapsed = (): void => setInfobarCollapsed(!infobarCollapsed)

  return (
    <Button variant="danger" onClick={toggleInfobarCollapsed}>
      <Icon name="info" size={24} strokeWidth={3} />
      {infobarCollapsed ? "Развернуть" : "Свернуть"}
    </Button>
  )
}
