import type { ReactNode } from "react"
import { LucentHeader, LucentBody, LucentSidebar, LucentInfobar } from "@scottwalker/lucent"
import { usePage } from "@lib/page-api"
import { Header } from "@widgets/layouts/ui/header"
import { Sidebar } from "@widgets/layouts/ui/sidebar"
import { Body } from "@widgets/layouts/ui/body"
import { Infobar } from "@widgets/layouts/ui/infobar"
// import { Footer } from "@widgets/layout/ui/footer"

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.Main
 * @param {ReactNode} children дочерние элементы
 */
export const Main = ({ children }: { children: ReactNode }): ReactNode => {
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

      {/* <LucentFooter>
        <Footer />
      </LucentFooter> */}
    </>
  )
}
