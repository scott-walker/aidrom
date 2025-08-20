import { createContext } from "react"

/**
 * Пропсы для контекста Sidebar
 * @namespace Sidebar.Types.SidebarContextProps
 */
export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

/**
 * Контекст для сайдбара
 * @namespace Sidebar.Types.SidebarContext
 */
export const SidebarContext = createContext<SidebarContextProps | null>(null)
