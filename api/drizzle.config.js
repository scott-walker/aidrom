import "dotenv/config"
import { defineConfig } from "drizzle-kit"

console.log(process.env.DATABASE_URL)

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  schema: "./src/db/schema",
  out: "./runtime/migrations",
  verbose: true
})
