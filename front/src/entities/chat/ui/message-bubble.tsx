import type { ReactNode, CSSProperties, Ref } from "react"
import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import { Roles } from "../lib/constants"

/**
 * Элемент списка сообщений
 * @namespace Entities.Chat.UI.MessageBubble
 */
type MessageBubbleProps = {
  children: ReactNode
  id: string
  role: Roles
  createdAt: Date
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLDivElement>
}

/**
 * Облачко сообщения
 * @namespace Entities.Chat.UI.MessageBubble
 */
export const MessageBubble = ({
  children,
  id,
  role,
  createdAt,
  className = "",
  style = {},
  ref
}: MessageBubbleProps) => {
  const containerClasses = makeClasses("flex", "flex-col", className)
  const roleClasses = makeClasses("px-6 py-2 text-sm text-foreground-soft/80 font-bold uppercase")
  const createdAtClasses = makeClasses("px-6 py-2 text-sm text-foreground-soft/50 text-right")
  const contentClasses = makeClasses(
    "px-6",
    "py-4",
    "min-w-[300px]",
    "max-w-full",
    "rounded-xl",
    "bg-background-soft",
    "typography-container",
    role === Roles.Client && "bg-background-hard/50",
    role === Roles.Agent && "shadow-md/5"
  )

  return (
    <div className={containerClasses} style={style} ref={ref} data-id={id}>
      <div className={roleClasses}>{role}</div>
      <div className={contentClasses}>{children}</div>
      <div className={createdAtClasses}>
        <DateTag date={createdAt} />
      </div>
    </div>
  )
}
