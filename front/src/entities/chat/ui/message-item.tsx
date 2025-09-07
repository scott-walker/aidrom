import { Roles, type Message } from "../lib/types"
import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"

/**
 * Элемент списка сообщений
 * @namespace Entities.Chat.UI.MessageItem
 */
export const MessageItem = ({ content, role, createdAt }: Message) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    role === Roles.Client && "items-end",
    role === Roles.Agent && "items-start"
  )
  const roleClasses = makeClasses("px-6 py-2 text-sm text-foreground-soft/80 font-bold uppercase")
  const createdAtClasses = makeClasses("px-6 py-2 text-sm text-foreground-soft/50 text-right")
  const contentClasses = makeClasses(
    "px-6",
    "py-4",
    "min-w-[300px]",
    "text-lg",
    "rounded-xl",
    "bg-background-soft",
    role === Roles.Client && "bg-background-hard/50",
    role === Roles.Agent && "text-foreground-hard shadow-md/5"
  )

  return (
    <div className={classes}>
      <div className={roleClasses}>{role}</div>
      <div className={contentClasses}>{content}</div>
      <div className={createdAtClasses}>
        <DateTag date={createdAt} />
      </div>
    </div>
  )
}
