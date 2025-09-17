import { Router, static as expressStatic, Response } from "express"
// import * as staticController from "@controllers/static.controller"
import { getConfigParam } from "@config"

const router: Router = Router()

// Роуты для работы со статическими файлами
// router.get("/:path", staticController.getStatic)

const staticDir = getConfigParam("staticDir") as string
const staticConfig = getConfigParam("static") as Record<string, unknown>
const config = {
  ...staticConfig,
  setHeaders: (res: Response, path: string) => {
    res.setHeader("X-Served-By", "Express-Static")
  }
}

router.use("/", expressStatic(staticDir, config))

export { router as staticRouter }
