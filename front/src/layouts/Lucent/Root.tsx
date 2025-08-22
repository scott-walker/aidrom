import type { FC, ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Page } from "./Page"
import { Header } from "./Header"
import { Body } from "./Body"
import { Content } from "./Content"
import { Infobar } from "./Infobar"
import styles from "./Lucent.module.css"

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
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Page>
        <Header />
        <Body>
          <Content>{children}</Content>
          <Infobar />
        </Body>
      </Page>
    </div>
  )
}
