import type { ComponentProps, FC, JSX } from "react"
import { Brand } from "@components/Brand"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Body } from "./Body"
import { Section } from "./Section"

/**
 * Пропсы
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = ComponentProps<"aside">

/**
 * Сайдбар (основной компонент)
 * @namespace Layouts.Lucent.Sidebar
 * @returns {JSX.Element}
 */
export const Sidebar: FC<Props> = ({ children, ...props }: Props): JSX.Element => {
  return (
    <aside className="flex flex-col relative z-10 h-full shadow-2xl shadow-foreground/15" {...props}>
      <Header>
        <Brand size="md" />
      </Header>
      <Body>
        <Section>
          <div>Sidebar Group 1</div>
        </Section>
        <Section>
          <div>Sidebar Group 2</div>
        </Section>
        <Section>{children}</Section>
      </Body>
      <Footer>
        <div>Sidebar Footer</div>
      </Footer>
    </aside>
  )
}
