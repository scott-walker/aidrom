import { createBrowserRouter, Outlet } from "react-router"
import { MainLayout } from "@widgets/layouts"
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
      // <CleanLayout>
      //   <Outlet />
      // </CleanLayout>
    ),
    errorElement: (
      <MainLayout>
        <ErrorBoundary />
      </MainLayout>
    ),
    children: pageRegistry.getRoutes()
  }
])
