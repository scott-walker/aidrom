import { createBrowserRouter, Outlet } from "react-router"
import { MainLayout } from "@shared/ui/layout"
import { pageRegistry } from "@pages"
import { ErrorBoundary } from "@widgets/error-boundary"

/**
 * Маршрутизатор
 * @namespace App.Router
 */
export const router = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: (
      <MainLayout>
        <ErrorBoundary />
      </MainLayout>
    ),
    children: pageRegistry.getRoutes()
  }
])
