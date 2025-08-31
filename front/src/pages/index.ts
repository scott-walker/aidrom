import { registerPages } from "@lib/page-api"
import { DashboardPage } from "./dashboard"
import { ToolsPage } from "./tools"
import { TestPage } from "./test"
import { ErrorPage } from "./error"

/**
 * Реестр страниц
 * @namespace Pages
 */
export const pageRegistry = registerPages([DashboardPage, ToolsPage, TestPage, ErrorPage])
