import { createBrowserRouter, Outlet } from "react-router"
import { MainLayout } from "@widgets/layouts"
import { pageRegistry } from "@pages"

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
    children: pageRegistry.getRoutes()
  }
])
