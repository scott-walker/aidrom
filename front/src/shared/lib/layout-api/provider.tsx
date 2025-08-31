import { useEffect, type FC, type ReactNode } from "react"
import type { LayoutContextApi, LayoutProviderProps } from "./types"
import { LayoutContext, useLayout } from "./context"

/**
 * Провайдер макета
 * @namespace Shared.Lib.LayoutApi.LayoutProvider
 * @param {LayoutProviderProps} props пропсы
 * @param {ReactNode} props.children дочерние элементы
 */
export const LayoutProvider: FC<LayoutProviderProps> = ({ children }: LayoutProviderProps): ReactNode => {
  const lucentApi: LayoutContextApi = useLayout()
  const { isThemeDark } = lucentApi
  const api: LayoutContextApi = { ...lucentApi }

  // Навешиваем темку
  useEffect(() => {
    document.body.classList.toggle("theme-dark", isThemeDark)
    document.body.classList.toggle("theme-light", !isThemeDark)
  }, [isThemeDark])

  return <LayoutContext.Provider value={api}>{children}</LayoutContext.Provider>
}
