import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { AgentsLayout } from "./layout"
import { Main } from "./pages/main"

/**
 * Маршруты страницы Agents
 * @namespace Pages.Agents.Routes
 */
export const routes: PageRoutes = {
  element: (
    <AgentsLayout>
      <Outlet />
    </AgentsLayout>
  ),
  path: "agents",
  children: [
    {
      index: true,
      element: <Main />
    }
  ]
}
