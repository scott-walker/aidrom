import type { PropsWithChildren, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Content from "./Content"

/**
 * Классы для основного контейнера макета
 * @type {string}
 */
const containerClasses: string = mergeClasses("flex", "flex-col", "w-full", "h-full")

/**
 * Основной компонент макета
 * @namespace Layouts.Main
 * @param {PropsWithChildren} children - Дочерние компоненты
 * @returns {JSX.Element} - Основной компонент макета
 */
export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Sidebar>
      <main className={containerClasses}>
        <Header />
        <Content>{children}</Content>
      </main>
    </Sidebar>
  )
}
