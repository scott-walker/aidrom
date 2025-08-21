import type { FC, ReactNode } from "react"
import {
  Sidebar as SidebarComponent,
  SidebarHeader,
  SidebarFooter,
  SidebarBody,
  SidebarSection
} from "@components/Sidebar"
import { Brand } from "@components/Brand"

/**
 * Пропсы сайдбара макета
 * @namespace Layouts.Lucent.Sidebar.Props
 */
type Props = {
  collapsed: boolean
}

/**
 * Сайдбар макета
 * @namespace Layouts.Lucent.Sidebar
 * @returns {ReactNode}
 */
export const Sidebar: FC<Props> = ({ collapsed = false }: Props): ReactNode => {
  return (
    <SidebarComponent collapsed={collapsed}>
      <SidebarHeader>
        <Brand size="md" compact={collapsed} inverted={collapsed} />
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>Управление</SidebarSection>
        <SidebarSection>Чаты</SidebarSection>
        <SidebarSection>Настройки</SidebarSection>
      </SidebarBody>

      <SidebarFooter>
        <p>Не все права защищены</p>
      </SidebarFooter>
    </SidebarComponent>
  )
}
