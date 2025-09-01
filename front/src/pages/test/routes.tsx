import type { PageRoutes } from "@lib/page-api/types"
import { TestLayout } from "./layout"
import { UiPage, TypographyPage, MainPage, FormPage } from "./pages"

/**
 * Маршруты страницы Test
 * @namespace Pages.Test.Routes
 */
export const routes: PageRoutes = {
  element: <TestLayout />,
  path: "test",
  children: [
    {
      index: true,
      element: <MainPage />
    },
    {
      path: "ui",
      element: <UiPage />
    },
    {
      path: "typography",
      element: <TypographyPage />
    },
    {
      path: "form",
      element: <FormPage />
    }
  ]
}
