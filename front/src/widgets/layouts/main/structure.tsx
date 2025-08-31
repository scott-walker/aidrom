import type { ReactNode } from "react"
import { LucentHeader, LucentBody, LucentSidebar, LucentInfobar, LucentFooter } from "@scottwalker/lucent"
import { usePage } from "@lib/page-api"
import { Header } from "@widgets/ui/layout/header"
import { Sidebar } from "@widgets/ui/layout/sidebar"
import { Body } from "@widgets/ui/layout/body"
import { Infobar } from "@widgets/ui/layout/infobar"
import { Footer } from "@widgets/ui/layout/footer"

/**
 * Структура макета
 * @namespace Widgets.Layouts.Main.Structure
 * @param {ReactNode} children дочерние элементы
 */
export const Structure = ({ children }: { children: ReactNode }): ReactNode => {
  const infobar = usePage().getSlot("infobar")

  return (
    <>
      <LucentHeader>
        <Header />
      </LucentHeader>

      <LucentSidebar>
        <Sidebar />
      </LucentSidebar>

      <LucentBody>
        <Body>{children}</Body>
      </LucentBody>

      {infobar && (
        <LucentInfobar>
          <Infobar>{infobar}</Infobar>
        </LucentInfobar>
      )}

      <LucentFooter>
        <Footer />
      </LucentFooter>
    </>
  )
}
