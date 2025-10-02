import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { LoaderBlock } from "@ui/loader-block"
import { AgentsLayout } from "./layout"
import { Main } from "./pages/main"
import { Agent } from "./pages/agent"

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
  hydrateFallbackElement: <LoaderBlock />,
  children: [
    {
      index: true,
      element: <Main />
    },
    {
      path: ":agentId",
      element: <Agent />
    }
  ]
}
