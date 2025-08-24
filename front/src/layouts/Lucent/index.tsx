import { useState, type FC, type ReactNode } from "react"
import { Root } from "./Root"
import {
  type ILayoutContext,
  type Theme,
  type PageExpanded,
  type SidebarCollapsed,
  type FooterVisible,
  type InfobarVisible,
  THEME_DARK,
  THEME_LIGHT,
  PAGE_DEFAULT,
  PAGE_EXPANDED,
  SIDEBAR_EXPANDED,
  SIDEBAR_COLLAPSED,
  FOOTER_VISIBLE,
  FOOTER_HIDDEN,
  INFOPBAR_VISIBLE,
  INFOPBAR_HIDDEN,
  LayoutContext,
  setLayoutTheme,
  setLayoutPageExpanded,
  setLayoutInfobarVisible,
  setLayoutFooterVisible,
  setLayoutSidebarCollapsed
} from "./context"

/**
 * Пропсы макета "Lucent"
 * @namespace Layouts.Lucent.Props
 * @param {Props} props.children - контент макета
 */
type Props = {
  children: ReactNode
}

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Layouts.Lucent
 * @param {Props} props.children - контент макета
 * @returns {ReactNode}
 */
export const Lucent: FC<Props> = ({ children }: Props): ReactNode => {
  const defaultTheme = THEME_LIGHT
  const defaultPageExpanded = PAGE_DEFAULT
  const defaultSidebarCollapsed = SIDEBAR_EXPANDED
  const defaultFooterVisible = FOOTER_VISIBLE
  const defaultInfobarVisible = INFOPBAR_HIDDEN

  // Состояние макета
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [pageExpanded, setPageExpanded] = useState<PageExpanded>(defaultPageExpanded)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<SidebarCollapsed>(defaultSidebarCollapsed)
  const [footerVisible, setFooterVisible] = useState<FooterVisible>(defaultFooterVisible)
  const [infobarVisible, setInfobarVisible] = useState<InfobarVisible>(defaultInfobarVisible)

  // Проверки состояния макета
  const isDarkTheme = (): boolean => theme === THEME_DARK
  const isPageExpanded = (): boolean => pageExpanded === PAGE_EXPANDED
  const isSidebarCollapsed = (): boolean => sidebarCollapsed === SIDEBAR_COLLAPSED
  const isFooterVisible = (): boolean => footerVisible === FOOTER_VISIBLE
  const isInfobarVisible = (): boolean => infobarVisible === INFOPBAR_VISIBLE

  // Установить состояние макета по умолчанию в DOM
  // useEffect(() => {
  //   setLayoutTheme(defaultTheme)
  //   setLayoutPageExpanded(defaultPageExpanded)
  //   setLayoutSidebarCollapsed(defaultSidebarCollapsed)
  //   setLayoutFooterVisible(defaultFooterVisible)
  //   setLayoutInfobarVisible(defaultInfobarVisible)
  // })

  /**
   * Переключить тему
   * @namespace Layouts.Lucent.toggleTheme
   */
  const toggleTheme = (): void => {
    const newTheme = isDarkTheme() ? THEME_LIGHT : THEME_DARK

    setTheme(newTheme)
    setLayoutTheme(newTheme)
  }

  /**
   * Переключить состояние раскрытости страницы
   * @namespace Layouts.Lucent.togglePageExpanded
   */
  const togglePageExpanded = (): void => {
    const newPageExpanded = isPageExpanded() ? PAGE_DEFAULT : PAGE_EXPANDED
    const newSidebarCollapsed = isSidebarCollapsed() ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED

    setPageExpanded(newPageExpanded)
    setSidebarCollapsed(newSidebarCollapsed)

    setLayoutPageExpanded(newPageExpanded)
    setLayoutSidebarCollapsed(newSidebarCollapsed)
  }

  /**
   * Переключить состояние свернутости сайдбара
   * @namespace Layouts.Lucent.toggleSidebarCollapsed
   * @see togglePageExpanded
   */
  const toggleSidebarCollapsed = togglePageExpanded

  /**
   * Переключить состояние видимости футера
   * @namespace Layouts.Lucent.toggleFooterVisible
   */
  const toggleFooterVisible = (): void => {
    const newFooterVisible = isFooterVisible() ? FOOTER_HIDDEN : FOOTER_VISIBLE

    setFooterVisible(newFooterVisible)
    setLayoutFooterVisible(newFooterVisible)
  }

  /**
   * Переключить состояние видимости инфобара
   * @namespace Layouts.Lucent.toggleInfobarVisible
   */
  const toggleInfobarVisible = (): void => {
    const newInfobarVisible = isInfobarVisible() ? INFOPBAR_HIDDEN : INFOPBAR_VISIBLE

    setInfobarVisible(newInfobarVisible)
    setLayoutInfobarVisible(newInfobarVisible)
  }

  const context: ILayoutContext = {
    theme,
    pageExpanded,
    sidebarCollapsed,
    footerVisible,
    infobarVisible,

    isDarkTheme,
    isPageExpanded,
    isSidebarCollapsed,
    isFooterVisible,
    isInfobarVisible,

    setTheme,
    setPageExpanded,
    setSidebarCollapsed,
    setFooterVisible,
    setInfobarVisible,

    toggleTheme,
    togglePageExpanded,
    toggleSidebarCollapsed,
    toggleFooterVisible,
    toggleInfobarVisible
  }

  return (
    <LayoutContext.Provider value={context}>
      <Root>{children}</Root>
    </LayoutContext.Provider>
  )
}
