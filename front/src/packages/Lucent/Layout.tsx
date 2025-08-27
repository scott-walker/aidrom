import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Page } from "./Page"
import { Header } from "./Header"
import { Body } from "./Body"
import { Content } from "./Content"
import { Infobar } from "./Infobar"
import { Footer } from "./Footer"
import styles from "./Lucent.module.css"
import { useLayout } from "./context"

/**
 * Корневой компонент макета
 * @namespace Lucent.Layout
 * @returns {ReactNode}
 */
export const Layout = (): ReactNode => {
  const { modes, slots } = useLayout()
  const { header, sidebar, content, infobar, footer } = slots

  return (
    <div className={styles.layout} data-theme={modes.theme}>
      <Sidebar {...sidebar} />
      <Page>
        <Header>{header}</Header>
        <Body>
          <Content>{content}</Content>
          <Infobar>{infobar}</Infobar>
        </Body>
        <Footer>{footer}</Footer>
      </Page>
    </div>
  )
}
