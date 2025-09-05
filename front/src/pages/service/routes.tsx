import type { PageRoutes } from "@lib/page-api/types"
import { ServiceLayout } from "./layout"
import { ServiceProviders } from "./providers"
import { ServiceSettings } from "./settings"
import { ServiceRequests } from "./requests"

/**
 * Маршруты
 * @namespace Pages.Service.Routes
 */
export const routes: PageRoutes = {
  element: <ServiceLayout />,
  path: "service",
  children: [
    {
      index: true,
      element: <ServiceProviders />
    },
    {
      path: "requests",
      element: <ServiceRequests />
    },
    {
      path: "settings",
      element: <ServiceSettings />
    }
  ]
}
