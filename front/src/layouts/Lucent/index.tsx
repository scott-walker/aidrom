import { useState, type FC, type ReactNode } from "react"
import { Root } from "./Root"
import { LayoutContext } from "./context"

/**
 * Пропсы макета "Lucent"
 * @namespace Layouts.Lucent.Props
 * @param {Props} props.children - контент макета
 */
type Props = {
  children: ReactNode
}

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Layouts.Lucent
 * @param {Props} props.children - контент макета
 * @returns {ReactNode}
 */
export const Lucent: FC<Props> = ({ children }: Props): ReactNode => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [infobarShown, setInfobarShown] = useState<boolean>(false)

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, infobarShown, setSidebarCollapsed, setInfobarShown }}>
      <Root>{children}</Root>
    </LayoutContext.Provider>
  )
}
