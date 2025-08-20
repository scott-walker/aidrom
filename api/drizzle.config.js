import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import config from "#config/index.js"
import { resolve } from "path"

// Для вызова из makefile основного проекта
const normalizePath = path => path.replace("/app/", "./")

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: config("dbUrl")
  },
  schema: resolve(config("dbDir"), "schema"),
  out: normalizePath(config("runtimeDir") + "/migrations"),
  verbose: true
})
