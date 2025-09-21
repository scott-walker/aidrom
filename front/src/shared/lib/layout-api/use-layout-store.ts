import { create } from "zustand"
import { LayoutTheme } from "./constants"
import { getLocalStorageTheme, setBodyTheme, setLocalStorageTheme } from "./utils"

/**
 * Интерфейс хранилища состояния макета
 * @namespace Widgets.Layout.Model.LayoutStore
 */
interface LayoutStore {
  title: string
  subtitle: string
  theme: string
  setTitle: (title: string) => void
  setSubtitle: (subtitle: string) => void
  setTheme: (theme: string) => void
}

/**
 * Хранилище состояния макета
 * @namespace Widgets.Layout.Model.useLayoutStore
 */
export const useLayoutStore = create<LayoutStore>(set => {
  const theme = getLocalStorageTheme() || LayoutTheme.LIGHT

  setBodyTheme(theme)

  return {
    /**
     * Заголовок
     * @namespace Widgets.Layout.Model.useLayoutStore.title
     */
    title: "AIDrom",

    /**
     * Подзаголовок
     * @namespace Widgets.Layout.Model.useLayoutStore.subtitle
     */
    subtitle: "",

    /**
     * Тема
     * @namespace Widgets.Layout.Model.useLayoutStore.theme
     */
    theme,

    /**
     * Установить заголовок
     * @namespace Widgets.Layout.Model.useLayoutStore.setTitle
     */
    setTitle: title => set({ title }),

    /**
     * Установить подзаголовок
     * @namespace Widgets.Layout.Model.useLayoutStore.setSubtitle
     */
    setSubtitle: subtitle => set({ subtitle }),

    /**
     * Установить тему
     * @namespace Widgets.Layout.Model.useLayoutStore.setDarkTheme
     */
    setTheme: theme => {
      setBodyTheme(theme)
      setLocalStorageTheme(theme)
      set({ theme })
    }
  }
})

/**
 * Хук для переключения темы
 * @namespace Shared.Lib.LayoutApi.useToggleTheme
 */
export const useToggleTheme = () => {
  const theme = useLayoutStore(state => state.theme)
  const setTheme = useLayoutStore(state => state.setTheme)

  return {
    isDark: theme === LayoutTheme.DARK,
    toggleTheme: () => setTheme(theme === LayoutTheme.DARK ? LayoutTheme.LIGHT : LayoutTheme.DARK)
  }
}
