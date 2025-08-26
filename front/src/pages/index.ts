import { registerPages } from "@lib/page-api"
import { DashboardPage } from "./dashboard"
import { ErrorPage } from "./error"

/**
 * Реестр страниц
 * @namespace Pages
 */
export const pageRegistry = registerPages([DashboardPage, ErrorPage])
