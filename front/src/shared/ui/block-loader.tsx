import { makeClasses } from "@lib/style-api"
import { Loader } from "./loader"

/**
 * Блочный лоадер
 * @namespace Shared.UI.BlockLoader
 */
export const BlockLoader = ({ className = "" }: { className?: string }) => {
  const classes = makeClasses("flex", "items-center", "justify-center", "h-full", "w-full", className)

  return (
    <div className={classes}>
      <Loader />
    </div>
  )
}
