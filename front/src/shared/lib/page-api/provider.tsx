import { useState, type FC, type ReactNode } from "react"
import type { PageContextApi, PageProviderProps, PageMeta, PageSlots, PageConfig, PageSlot } from "./types"
import { PageContext } from "./context"
import { mergeConfig, normalizeConfig } from "./utils"

/**
 * Провайдер страницы
 * @namespace Shared.Lib.PageApi.PageProvider
 * @param {PageProviderProps} props пропсы
 * @param {ReactNode} props.children дочерние элементы
 * @param {PageConfig} props.config конфигурация страницы
 */
export const PageProvider: FC<PageProviderProps> = ({ children, config }: PageProviderProps): ReactNode => {
  const defaultConfig = normalizeConfig(config)

  const [meta, setMeta] = useState<PageMeta>(defaultConfig.meta)
  const [slots, setSlots] = useState<PageSlots>(defaultConfig.slots)

  /**
   * Получить конфигурацию страницы
   * @returns {PageConfig} конфигурация страницы
   */
  const getConfig = (): PageConfig => ({ meta, slots })

  /**
   * Установить конфигурацию страницы
   * @param {PageConfig} config конфигурация страницы
   */
  const setConfig = (config: PageConfig) => {
    config = mergeConfig(defaultConfig, config)

    console.log("setConfig", config)

    setMeta(config.meta ?? {})
    setSlots(config.slots ?? {})
  }

  /**
   * Сбросить конфигурацию страницы
   */
  const unsetConfig = () => {
    setMeta({})
    setSlots({})
  }

  /**
   * Установить заголовок страницы
   * @param {string} title заголовок страницы
   */
  const setTitle = (title: string) => setMeta({ ...meta, title })

  /**
   * Установить подзаголовок страницы
   * @param {string} subtitle подзаголовок страницы
   */
  const setSubtitle = (subtitle: string) => setMeta({ ...meta, subtitle })

  /**
   * Установить описание страницы
   * @param {string} description описание страницы
   */
  const setDescription = (description: string) => setMeta({ ...meta, description })

  /**
   * Получить заголовок страницы
   * @returns {string} заголовок страницы
   */
  const getTitle = (): string => meta.title ?? ""

  /**
   * Получить подзаголовок страницы
   * @returns {string} подзаголовок страницы
   */
  const getSubtitle = (): string => meta.subtitle ?? ""

  /**
   * Получить описание страницы
   * @returns {string} описание страницы
   */
  const getDescription = (): string => meta.description ?? ""

  /**
   * Установить слот
   * @param {keyof PageSlots} slotName название слота
   * @param {ReactNode} node контент
   */
  const setSlot = (slotName: keyof PageSlots, node: PageSlot) => setSlots({ ...slots, [slotName]: node })

  /**
   * Получить слот страницы
   * @param {keyof PageSlots} slotName название слота
   * @returns {ReactNode} контент
   */
  const getSlot = (slotName: keyof PageSlots): PageSlot => slots[slotName] ?? null

  // API контекста страницы
  const api: PageContextApi = {
    setConfig,
    unsetConfig,
    getConfig,

    // Сеттеры
    setTitle,
    setSubtitle,
    setDescription,
    setSlot,

    // Геттеры
    getTitle,
    getSubtitle,
    getDescription,
    getSlot
  }

  return <PageContext.Provider value={api}>{children}</PageContext.Provider>
}
