import type { ReactNode } from "react"
import type { LayoutConfig } from "./types"
import { Provider } from "./Provider"
import { Layout } from "./Layout"

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Lucent
 * @param {LayoutConfig} props.config - конфигурация макета
 * @returns {ReactNode}
 */
export const Lucent = ({ config }: { config: LayoutConfig }): ReactNode => {
  return (
    <Provider config={config}>
      <Layout />
    </Provider>
  )
}
