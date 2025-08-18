import type { PropsWithChildren, JSX } from "react"
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  // Plane,
  // Rocket,
  // GalleryHorizontalEnd,
  // Maximize,
  // Minimize,
  // GalleryVerticalEnd,
  // AudioLines,
  AudioWaveform
} from "lucide-react"
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
const headerClasses: string = mergeClasses("flex", "flex-row", "items-center", "justify-start", "gap-3", "h-18", "pl-8")

/**
 * Основной компонент сайдбара
 * @namespace Layouts.Main.Sidebar
 * @param {PropsWithChildren} children - Основной контент
 * @returns {JSX.Element} - Основной компонент сайдбара
 */
export default function Sidebar({ children }: PropsWithChildren): JSX.Element {
  const primaryMenuItems = primaryItems.map(item => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild size="default">
        <a href={item.url}>
          <item.icon />
          <span className="text-md font-medium">{item.title}</span>
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
      <SidebarRoot className="z-11 shadow-2xl shadow-foreground/17">
        <SidebarContent>
          <SidebarHeader className={headerClasses}>
            {/* <Plane className="w-10 h-10" /> */}
            {/* <Rocket className="w-10 h-10 text-primary animate-skew" /> */}
            {/* <GalleryHorizontalEnd className="w-9 h-9 text-primary animate-skew" /> */}
            {/* <GalleryVerticalEnd className="w-8 h-8" /> */}
            {/* <Minimize className="w-12 h-12 text-primary animate-skew" /> */}
            {/* <AudioLines className="w-11 h-11 text-primary animate-skew" /> */}
            <AudioWaveform className="w-10 h-10 text-primary animate-skew" />
            {/* <Maximize className="w-10 h-10 text-primary animate-target" /> */}
            <h1 className="text-2xl ">AIDrom</h1>
          </SidebarHeader>

          {/* <SidebarSeparator /> */}

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
