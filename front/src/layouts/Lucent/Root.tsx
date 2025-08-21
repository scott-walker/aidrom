import { useContext, type FC, type ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { SidebarTrigger } from "./SidebarTrigger"
import { Header } from "./Header"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Content } from "./Content"
import { Infobar } from "./Infobar"
import { LayoutContext, type ILayoutContext } from "./context"

/**
 * Пропсы корневого компонента макета
 * @namespace Layouts.Lucent.Root.Props
 */
type Props = {
  children: ReactNode
}

/**
 * Корневой компонент макета
 * @namespace Layouts.Lucent.Root
 * @returns {ReactNode}
 */
export const Root: FC<Props> = ({ children }: Props): ReactNode => {
  const { sidebarCollapsed, infobarShown } = useContext(LayoutContext) as ILayoutContext

  return (
    <div className="fixed inset-0 flex bg-background">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex flex-col flex-1">
        <Header>
          <SidebarTrigger />
          <h1 className="text-2xl font-family-display">Dashboard</h1>
        </Header>

        <Body className="flex-1">
          <Content className="flex-1">{children}</Content>
          <Infobar shown={infobarShown}>Это инфобар</Infobar>
        </Body>

        {/* <Footer>Это футер</Footer> */}
      </div>
    </div>
  )
}
