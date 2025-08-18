import type { PropsWithChildren, JSX } from "react"
import { Home, Inbox, Calendar, Search, Settings, Plane } from "lucide-react"
import { mergeClasses } from "@utils/jsxtools"
import {
  Sidebar as SidebarRoot,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenuBadge
} from "@components/Sidebar"

/**
 * Тип элемента меню
 * @namespace Layouts.Main.Sidebar.MenuItem
 * @type {MenuItem}
 */
type MenuItem = {
  title: string
  url: string
  icon: React.ComponentType
  eventsNumber?: number
}

/**
 * Основное меню
 * @namespace Layouts.Main.Sidebar.PrimaryItems
 * @type {MenuItem[]}
 */
const primaryItems: MenuItem[] = [
  {
    title: "Главная",
    url: "#",
    icon: Home,
    eventsNumber: 2
  },
  {
    title: "Проекты",
    url: "#",
    icon: Inbox
  },
  {
    title: "Задачи",
    url: "#",
    icon: Calendar,
    eventsNumber: 37
  }
]

/**
 * Дополнительное меню
 * @namespace Layouts.Main.Sidebar.SecondaryItems
 * @type {MenuItem[]}
 */
const secondaryItems: MenuItem[] = [
  {
    title: "Поиск",
    url: "#",
    icon: Search
  },
  {
    title: "Настройки",
    url: "#",
    icon: Settings
  }
]

/**
 * Классы для хедера сайдбара
 * @namespace Layouts.Main.Sidebar.HeaderClasses
 * @type {string}
 */
const headerClasses: string = mergeClasses("flex", "flex-row", "items-center", "gap-3", "h-13", "px-6")

/**
 * Основной компонент сайдбара
 * @namespace Layouts.Main.Sidebar
 * @param {PropsWithChildren} children - Основной контент
 * @returns {JSX.Element} - Основной компонент сайдбара
 */
export default function Sidebar({ children }: PropsWithChildren): JSX.Element {
  const primaryMenuItems = primaryItems.map(item => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {item.eventsNumber && <SidebarMenuBadge>{item.eventsNumber}</SidebarMenuBadge>}
    </SidebarMenuItem>
  ))

  const secondaryMenuItems = secondaryItems.map(item => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {item.eventsNumber && <SidebarMenuBadge>{item.eventsNumber}</SidebarMenuBadge>}
    </SidebarMenuItem>
  ))

  return (
    <SidebarProvider>
      <SidebarRoot>
        <SidebarContent>
          <SidebarHeader className={headerClasses}>
            <Plane className="w-6 h-6" />
            <span className="text-xl text-primary font-bold">AiDrom</span>
          </SidebarHeader>

          <SidebarGroup className="px-4">
            <SidebarGroupLabel className="mb-1 text-sm text-muted-foreground/50">Основное</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{primaryMenuItems}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup className="px-4">
            <SidebarGroupLabel className="mb-1 text-sm text-muted-foreground/50">Управление</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{secondaryMenuItems}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarRoot>

      {children}
    </SidebarProvider>
  )
}
