import { makeClasses } from "@lib/style-api"
import { InputSection } from "./ui/input-section"

/**
 * Стуктура чата
 * @namespace Widgets.Chat
 */
export const Chat = () => {
  const containerClasses = makeClasses("flex flex-col")
  const headerClasses = makeClasses("flex flex-col gap-2")
  const bodyClasses = makeClasses("flex flex-col gap-2")
  const inputClasses = makeClasses("flex flex-col gap-2")

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>Header</div>
      <div className={bodyClasses}>Messages</div>
      <div className={inputClasses}>
        <InputSection />
      </div>
    </div>
  )
}
