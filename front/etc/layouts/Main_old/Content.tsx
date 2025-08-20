import type { PropsWithChildren, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Классы для основного контента
 * @type {string}
 */
const contentClasses: string = mergeClasses("flex", "flex-col", "px-8")

/**
 * Основной контент
 * @param {PropsWithChildren} children - Дочерние компоненты
 * @returns {JSX.Element} - Основной контент
 */
export default function Content({ children }: PropsWithChildren): JSX.Element {
  return <div className={contentClasses}>{children}</div>
}
