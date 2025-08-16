import type { PropsWithChildren } from "react"
import Sidebar from "@components/sidebar"
import Header from "@components/header"
import Content from "@components/content"

export default function MainLayout({ children }: PropsWithChildren) {
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
