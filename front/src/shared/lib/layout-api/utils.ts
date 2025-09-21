import { LayoutTheme } from "./constants"

/**
 * Установить тему в body
 * @namespace Shared.Lib.LayoutApi.Utils.setBodyTheme
 */
export const setBodyTheme = (theme: string) => {
  document.body.classList.toggle("theme-dark", theme === LayoutTheme.DARK)
}

/**
 * Установить тему в LocalStorage
 * @namespace Shared.Lib.LayoutApi.Utils.setLocalStorageTheme
 */
export const setLocalStorageTheme = (theme: string) => {
  setBodyTheme(theme)

  localStorage.setItem("layout.theme", theme)
}

/**
 * Получить тему из LocalStorage
 * @namespace Shared.Lib.LayoutApi.Utils.getLocalStorageTheme
 */
export const getLocalStorageTheme = (): string | null => localStorage.getItem("layout.theme")
