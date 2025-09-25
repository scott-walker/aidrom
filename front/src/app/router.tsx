import { createBrowserRouter, Outlet } from "react-router"
import { Layout } from "@widgets/layout"
import { pageRegistry } from "@pages"
import { ErrorBoundary } from "@widgets/error-boundary"

/**
 * Маршрутизатор
 * @namespace App.Router
 */
export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorBoundary />
      </Layout>
    ),
    children: pageRegistry.getRoutes()
  }
])
