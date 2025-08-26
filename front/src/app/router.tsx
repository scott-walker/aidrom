import { createBrowserRouter, Outlet } from "react-router"
import { PanelLayout } from "@layouts"
import { pageRegistry } from "@pages"

/**
 * Маршрутизатор
 * @namespace App.Router
 */
export const router = createBrowserRouter([
  {
    element: (
      <PanelLayout>
        <Outlet />
      </PanelLayout>
    ),
    children: pageRegistry.getRoutes()
  }
])
