import { useMemo, useCallback, useState, type FC, type JSX } from "react"
import { useIsMobile } from "./hooks"
import { SidebarContext, makeProviderClass, makeProviderStyle, type SidebarContextProps } from "./assets"
import { TooltipProvider } from "@ui/Tooltip"

// const SIDEBAR_COOKIE_NAME = "sidebar_state"
// const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
// const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/**
 * Пропсы для компонента SidebarProvider
 * @namespace Sidebar.Provider.Props
 */
type Props = React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Конструктор
 * @namespace Sidebar.Provider.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Provider.Component
 */
type Component = JSX.Element

/**
 * Провайдер для сайдбара
 * @namespace Sidebar.Provider
 * @type {Constructor}
 * @param Props.defaultOpen - начальное состояние
 * @param Props.open - текущее состояние
 * @param Props.onOpenChange - функция для изменения состояния
 * @param Props.className - классы для контейнера
 * @param Props.style - стили для контейнера
 * @param Props.children - дочерние элементы
 * @param Props.props - пропсы для контейнера
 */
const SidebarProvider: Constructor = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: Props): Component => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  // Внутреннее состояние сайдбара.
  // Используем openProp и setOpenProp для управления извне компонента.
  const [_open, _setOpen] = useState(defaultOpen)

  const open = openProp ?? _open
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      // Если функция для изменения состояния передана, используем ее.
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Устанавливаем куку для сохранения состояния сайдбара.
      // document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      // localStorage.setItem(SIDEBAR_COOKIE_NAME, openState.toString())
    },
    [setOpenProp, open]
  )

  // Вспомогательная функция для переключения сайдбара.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Добавляем горячую клавишу для переключения сайдбара.
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
  //       event.preventDefault()
  //       toggleSidebar()
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)

  //   return () => window.removeEventListener("keydown", handleKeyDown)
  // }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"
  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  const containerClass = makeProviderClass(className || "")
  const containerStyle = makeProviderStyle(style || {})

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div data-slot="sidebar-wrapper" style={containerStyle} className={containerClass} {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
