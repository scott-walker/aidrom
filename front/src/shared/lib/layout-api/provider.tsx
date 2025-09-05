import { useEffect, useState, type FC, type ReactNode } from "react"
import { useLayout, type LayoutApi as LucentApi } from "@scottwalker/lucent"
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
  // console.log("LayoutProvider")

  const lucentApi: LucentApi = useLayout()
  const { isThemeDark, isSidebarCollapsed } = lucentApi
  const [title, setTitle] = useState<string>("")
  const [subtitle, setSubtitle] = useState<string>("")

  const api: LayoutContextApi = {
    ...lucentApi,
    title,
    subtitle,
    setTitle,
    setSubtitle
  }

  useEffect(() => setLayoutDarkTheme(isThemeDark), [isThemeDark])
  useEffect(() => setLayoutCollapsedSidebar(isSidebarCollapsed), [isSidebarCollapsed])

  return <LayoutContext.Provider value={api}>{children}</LayoutContext.Provider>
}
