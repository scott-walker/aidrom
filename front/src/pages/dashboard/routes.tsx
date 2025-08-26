import type { PageRoutes } from "@lib/page-api/types"
import { DashboardLayout } from "./layout"
import { DashboardIndex, DashboardSettings } from "./pages"

/**
 * Маршруты
 * @namespace Pages.Dashboard.Routes
 */
export const routes: PageRoutes = {
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardIndex />
    },
    {
      path: "settings",
      element: <DashboardSettings />
    }
  ]
}
