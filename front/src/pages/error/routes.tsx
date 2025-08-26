import type { PageRoutes } from "@lib/page-api/types"
import { ErrorLayout } from "./layout"
import { NotFound } from "./pages"

/**
 * Маршруты страницы Error
 * @namespace Pages.Error.Routes
 */
export const routes: PageRoutes = {
  element: <ErrorLayout />,
  children: [
    {
      path: "*",
      element: <NotFound />
    }
  ]
}
