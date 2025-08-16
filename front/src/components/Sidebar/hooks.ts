import { useContext, useState, useEffect } from "react"
import { SidebarContext, type SidebarContextProps } from "./assets"

/**
 * Хук для получения контекста Sidebar
 * @namespace Sidebar.Hooks.UseSidebar
 * @returns {SidebarContextProps} контекст Sidebar
 */
export function useSidebar(): SidebarContextProps {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

/**
 * Хук для определения мобильного устройства
 * @namespace Sidebar.Hooks.UseIsMobile
 * @returns {boolean} true, если устройство мобильное
 */
export function useIsMobile(): boolean {
  const MOBILE_BREAKPOINT = 768
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    mql.addEventListener("change", onChange)

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
