import { registerPages } from "@lib/page-api"
import { DashboardPage } from "./dashboard"
import { ServicePage } from "./service"
import { ChatPage } from "./chat"
import { AgentsPage } from "./agents"
import { TestPage } from "./test"
import { ErrorPage } from "./error"

/**
 * Реестр страниц
 * @namespace Pages
 */
export const pageRegistry = registerPages([DashboardPage, ServicePage, ChatPage, AgentsPage, TestPage, ErrorPage])
