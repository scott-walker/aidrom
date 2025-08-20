import type { FC, JSX } from "react"
import { Sidebar } from "./Sidebar"
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
  const collapsed = true
  const firstSideVariants = cva("w-[var(--sidebar-width)]", {
    defaultVariants: {
      collapsed: false
    },
    variants: {
      collapsed: {
        true: "w-[var(--sidebar-collapsed-width)]"
      }
    }
  })
  const secondSideVariants = cva("flex flex-col w-[calc(100%-var(--sidebar-width))]", {
    defaultVariants: {
      collapsed: false
    },
    variants: {
      collapsed: {
        true: "w-[calc(100%-var(--sidebar-collapsed-width))]"
      }
    }
  })

  return (
    <div className="fixed inset-0 flex bg-background">
      <div className={firstSideVariants({ collapsed })}>
        <Sidebar>{sidebar}</Sidebar>
      </div>
      <div className={secondSideVariants({ collapsed })}>
        <Header>{header}</Header>
        <Body className="flex-1 flex">
          <Content className="flex-1">{content}</Content>
          <Infobar className="w-1/4">{infobar}</Infobar>
        </Body>
        <Footer>{footer}</Footer>
      </div>
    </div>
  )
}
