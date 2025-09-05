import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { Layout } from "./layout"
import { Main } from "./pages/main"
import { Settings } from "./pages/settings"

/**
 * Маршруты
 * @namespace Pages.Dashboard.Routes
 */
export const routes: PageRoutes = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [
    {
      index: true,
      element: <Main />
    },
    {
      path: "settings",
      element: <Settings />
    }
  ]
}
