import type { PropsWithChildren } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Content from "@/components/Content"

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
