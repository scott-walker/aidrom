import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { Layout } from "./layout"
import { Providers } from "./pages/providers"
import { Settings } from "./pages/settings"
import { Requests } from "./pages/requests"

/**
 * Маршруты
 * @namespace Pages.Service.Routes
 */
export const routes: PageRoutes = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  path: "service",
  children: [
    {
      index: true,
      element: <Providers />
    },
    {
      path: "requests",
      element: <Requests />
    },
    {
      path: "settings",
      element: <Settings />
    }
  ]
}
