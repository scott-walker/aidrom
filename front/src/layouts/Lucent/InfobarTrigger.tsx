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
  const { infobarShown, setInfobarShown } = useContext(LayoutContext) as ILayoutContext

  const toggleInfobarShown = (): void => setInfobarShown(!infobarShown)

  return (
    <Button variant="danger" onClick={toggleInfobarShown}>
      <Icon name="info" size={24} strokeWidth={3} />
    </Button>
  )
}
