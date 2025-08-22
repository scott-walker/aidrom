import { useContext, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Code } from "@ui/Code"
import { Sidebar } from "./Sidebar"
import { SidebarTrigger } from "./SidebarTrigger"
import { LayoutContext, type ILayoutContext } from "./context"
import { Header } from "./Header"
import { Body } from "./Body"
import { Content } from "./Content"
import { Infobar } from "./Infobar"
import { ThemeTrigger } from "./ThemeTrigger"
import styles from "./Lucent.module.css"
import { Page } from "./Page"

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
    <div className={styles.layout}>
      <Sidebar collapsed={sidebarCollapsed} />

      <Page className={cn(styles.page, sidebarCollapsed && styles.expanded)}>
        <Header className={styles.header}>
          <SidebarTrigger />
          <h1 className="text-2xl font-family-display">Панель</h1>
          <ThemeTrigger className="ml-auto" />
        </Header>

        <Body className={styles.body}>
          <Content className={styles.content}>{children}</Content>
          <Infobar shown={infobarShown}>
            <h2>Это инфобар</h2>
            <Code className="mt-10">console.log("Hello, world!")</Code>
          </Infobar>
        </Body>
      </Page>
    </div>
  )
}
