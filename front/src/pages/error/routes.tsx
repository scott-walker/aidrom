import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { ErrorLayout } from "./layout"
import { NotFound } from "./pages/not-found"

/**
 * Маршруты страницы Error
 * @namespace Pages.Error.Routes
 */
export const routes: PageRoutes = {
  element: (
    <ErrorLayout>
      <Outlet />
    </ErrorLayout>
  ),
  children: [
    {
      path: "*",
      element: <NotFound />
    }
  ]
}
