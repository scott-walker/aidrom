import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { DashboardLayout } from "./layout"
import { DashboardMain, DashboardSettings } from "./pages"

/**
 * Маршруты
 * @namespace Pages.Dashboard.Routes
 */
export const routes: PageRoutes = {
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      element: <DashboardMain />
    },
    {
      path: "settings",
      element: <DashboardSettings />
    }
  ]
}
