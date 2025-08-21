import { useState, type FC, type JSX } from "react"
import { Sidebar } from "./Sidebar"
import { Trigger as SidebarTrigger } from "./Sidebar/Trigger"
import { Header } from "./Header"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Content } from "./Content"
import { Infobar } from "./Infobar"
import { cva } from "class-variance-authority"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Props
 */
type Props = {
  content: JSX.Element
  header?: JSX.Element | null
  sidebar?: JSX.Element | null
  infobar?: JSX.Element | null
  footer?: JSX.Element | null
}

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Layouts.Lucent
 * @param {Props} props.content - контент страницы
 * @param {Props} props.header - контент заголовка
 * @param {Props} props.sidebar - контент сайдбара
 * @param {Props} props.infobar - контент инфобар
 * @param {Props} props.footer - контент футера
 * @returns {JSX.Element}
 */
export const Lucent: FC<Props> = ({ content, header, sidebar, infobar, footer }: Props): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleSidebar = () => setCollapsed(!collapsed)

  const firstSideVariants = cva("transition-width duration-200", {
    variants: {
      collapsed: {
        false: "w-[var(--sidebar-width)]",
        true: "w-[var(--sidebar-collapsed-width)]"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  })
  const secondSideVariants = cva("flex flex-col", {
    variants: {
      collapsed: {
        false: "w-[calc(100%-var(--sidebar-width))]",
        true: "w-[calc(100%-var(--sidebar-collapsed-width))]"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  })

  return (
    <div className="fixed inset-0 flex bg-background">
      <div className={firstSideVariants({ collapsed })}>
        <Sidebar>{sidebar}</Sidebar>
      </div>
      <div className={secondSideVariants({ collapsed })}>
        <Header>
          <SidebarTrigger onClick={toggleSidebar} />
          {header}
        </Header>
        <Body className="flex-1 flex">
          <Content className="flex-1">{content}</Content>
          <Infobar className="w-1/4">{infobar}</Infobar>
        </Body>
        <Footer>{footer}</Footer>
      </div>
    </div>
  )
}
