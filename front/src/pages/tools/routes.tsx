import type { PageRoutes } from "@lib/page-api/types"
import { ToolsLayout } from "./layout"
import { ToolsMain } from "./main"

/**
 * Маршруты
 * @namespace Pages.Tools.Routes
 */
export const routes: PageRoutes = {
  element: <ToolsLayout />,
  path: "tools",
  children: [
    {
      index: true,
      element: <ToolsMain />
    }
  ]
}
