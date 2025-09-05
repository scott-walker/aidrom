import type { ReactNode } from "react"
import { Lucent } from "@scottwalker/lucent"
// import { usePage } from "@lib/page-api"
import { Header } from "@widgets/layouts/ui/header"
import { Sidebar } from "@widgets/layouts/ui/sidebar"
import { Body } from "@widgets/layouts/ui/body"
// import { Infobar } from "@widgets/layouts/ui/infobar"
// import { Footer } from "@widgets/layout/ui/footer"

/**
 * Главный макет приложения
 * @namespace Widgets.Layouts.Main
 * @param {ReactNode} children дочерние элементы
 */
export const Main = ({ children }: { children: ReactNode }): ReactNode => {
  // const infobar = usePage().getSlot("infobar")

  return (
    <>
      <Lucent.Header>
        <Header />
      </Lucent.Header>

      <Lucent.Sidebar>
        <Sidebar />
      </Lucent.Sidebar>

      <Lucent.Body>
        <Body>{children}</Body>
      </Lucent.Body>

      {/* {infobar && (
        <Lucent.Infobar>
          <Infobar>{infobar}</Infobar>
        </Lucent.Infobar>
      )} */}

      {/* <Lucent.Footer>
        <Footer />
      </Lucent.Footer> */}
    </>
  )
}
