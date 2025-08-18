import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import config from "#config/index.js"
import { resolve } from "path"

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: config("dbUrl")
  },
  schema: resolve(config("dbDir"), "schema"),
  out: resolve(config("runtimeDir"), "migrations"),
  verbose: true
})
