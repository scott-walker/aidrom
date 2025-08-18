import type { PropsWithChildren, JSX } from "react"
import Sidebar from "@components/Sidebar"
import Header from "@components/Header"
import Content from "@components/Content"

/**
 * Основной компонент макета
 * @param {PropsWithChildren} children - Дочерние компоненты
 * @returns {JSX.Element} - Основной компонент макета
 */
export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <Content>{children}</Content>
      </div>
    </div>
  )
}
