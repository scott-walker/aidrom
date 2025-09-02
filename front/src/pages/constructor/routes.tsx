import type { PageRoutes } from "@lib/page-api/types"
import { ConstructorLayout } from "./layout"
import { ConstructorMain } from "./main"

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
    }
  ]
}
