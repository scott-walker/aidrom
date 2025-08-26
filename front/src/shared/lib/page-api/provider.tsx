import { useState, type FC, type ReactNode } from "react"
import type { PageContextApi, PageProviderProps, PageMeta, PageSlots, PageConfig } from "./types"
import { PageContext } from "./context"

/**
 * Провайдер страницы
 * @namespace Shared.Lib.PageApi.PageProvider
 * @param {PageProviderProps} props пропсы
 * @param {ReactNode} props.children дочерние элементы
 * @param {PageConfig} props.config конфигурация страницы
 */
export const PageProvider: FC<PageProviderProps> = ({ children, config }: PageProviderProps): ReactNode => {
  const [meta, setMeta] = useState<PageMeta>(config.meta ?? {})
  const [slots, setSlots] = useState<PageSlots>(config.slots ?? {})

  /**
   * Установить конфигурацию страницы
   * @param {PageConfig} config конфигурация страницы
   */
  const setConfig = (config: PageConfig) => {
    config = config ?? {}

    if (config.meta) setMeta(config.meta)
    if (config.slots) setSlots(config.slots)
  }

  /**
   * Установить заголовок страницы
   * @param {string} title заголовок страницы
   */
  const setTitle = (title: string) => setMeta({ ...meta, title })

  /**
   * Получить заголовок страницы
   * @returns {string} заголовок страницы
   */
  const getTitle = (): string => meta.title ?? ""

  /**
   * Установить слот
   * @param {keyof PageSlots} slot ключ слота
   * @param {ReactNode} node контент
   */
  const setSlot = (slot: keyof PageSlots, node: ReactNode) => setSlots({ ...slots, [slot]: node })

  /**
   * Получить слот страницы
   * @param {keyof PageSlots} slot ключ слота
   * @returns {ReactNode} контент слота
   */
  const getSlot = (slot: keyof PageSlots): ReactNode => slots[slot] ?? null

  // API контекста страницы
  const api: PageContextApi = {
    setConfig,
    setTitle,
    getTitle,
    setSlot,
    getSlot
  }

  return <PageContext.Provider value={api}>{children}</PageContext.Provider>
}
