import "dotenv/config"

export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL
}
