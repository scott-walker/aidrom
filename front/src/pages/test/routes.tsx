import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { Layout } from "./layout"
import { Main } from "./pages/main"
import { Typo } from "./pages/typo"
import { Markdown } from "./pages/markdown"
import { Json } from "./pages/json"

/**
 * Маршруты
 * @namespace Pages.Tools.Routes
 */
export const routes: PageRoutes = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  path: "test",
  children: [
    {
      index: true,
      element: <Main />
    },
    {
      path: "typo",
      element: <Typo />
    },
    {
      path: "markdown",
      element: <Markdown />
    },
    {
      path: "json",
      element: <Json />
    }
  ]
}
