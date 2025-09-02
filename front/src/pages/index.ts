import { registerPages } from "@lib/page-api"
import { DashboardPage } from "./dashboard"
import { ConstructorPage } from "./constructor"
import { ToolsPage } from "./tools"
import { TestPage } from "./test"
import { ErrorPage } from "./error"

/**
 * Реестр страниц
 * @namespace Pages
 */
export const pageRegistry = registerPages([DashboardPage, ConstructorPage, ToolsPage, TestPage, ErrorPage])
