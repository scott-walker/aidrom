import { makeClasses } from "@lib/style-api"
import styles from "./loader.module.css"

/**
 * Лоадер
 * https://www.cssportal.com/css-loader-generator/
 * @namespace UI.Loader
 */
export const Loader = () => {
  const classes = makeClasses("p-4", "flex", "items-center", "justify-center")

  return (
    <div className={classes}>
      <div className={styles.loader}></div>
    </div>
  )
}
