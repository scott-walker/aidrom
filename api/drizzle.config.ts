import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { getConfigParam } from "@config"
import { resolve } from "node:path"

/**
 * Нормализовать путь (для вызова из makefile за пределами контейнера)
 * @param {string} path Путь
 */
const normalizePath = (path: string) => path.replace("/app/", "./")

const dbUrl = getConfigParam("dbUrl") as string
const dbDir = getConfigParam("dbDir") as string
const runtimeDir = getConfigParam("runtimeDir") as string

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url: dbUrl },
  schema: resolve(dbDir, "schema"),
  out: normalizePath(runtimeDir + "/migrations"),
  verbose: true
})
