import { useEffect, type FC, type ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import type { LayoutContextApi, LayoutProviderProps } from "./types"
import { setLayoutCollapsedSidebar, setLayoutDarkTheme } from "./utils"
import { LayoutContext } from "./context"

/**
 * Провайдер макета
 * @namespace Shared.Lib.LayoutApi.LayoutProvider
 * @param {LayoutProviderProps} props пропсы
 * @param {ReactNode} props.children дочерние элементы
 */
export const LayoutProvider: FC<LayoutProviderProps> = ({ children }: LayoutProviderProps): ReactNode => {
  const lucentApi: LayoutContextApi = useLayout()
  const { isThemeDark, isSidebarCollapsed } = lucentApi
  const api: LayoutContextApi = { ...lucentApi }

  useEffect(() => setLayoutDarkTheme(isThemeDark), [isThemeDark])
  useEffect(() => setLayoutCollapsedSidebar(isSidebarCollapsed), [isSidebarCollapsed])

  return <LayoutContext.Provider value={api}>{children}</LayoutContext.Provider>
}
