import type { PageRoutes } from "@lib/page-api/types"
import { ConstructorLayout } from "./layout"
import { ConstructorMain } from "./main"
import { ConstructorAgents } from "./agents"
import { ConstructorProviders } from "./providers"
import { ConstructorSettings } from "./settings"

/**
 * Маршруты
 * @namespace Pages.Constructor.Routes
 */
export const routes: PageRoutes = {
  element: <ConstructorLayout />,
  path: "constructor",
  children: [
    {
      index: true,
      element: <ConstructorMain />
    },
    {
      path: "agents",
      element: <ConstructorAgents />
    },
    {
      path: "providers",
      element: <ConstructorProviders />
    },
    {
      path: "settings",
      element: <ConstructorSettings />
    }
  ]
}
