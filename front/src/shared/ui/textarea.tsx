import type { ComponentProps } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы компонента textarea
 * @namespace Shared.UI.ChatInput.TextareaProps
 */
type TextareaProps = ComponentProps<"textarea"> & {}

/**
 * Компонент ввода сообщения
 * @namespace Shared.UI.ChatInput
 */
export const Textarea = ({ rows = 2, onChange, className = "", ...props }: TextareaProps) => {
  const classes = makeClasses(
    "w-full",
    "px-6",
    "py-2",
    "rounded-lg",
    "border-2",
    "border-transparent",
    "overflow-hidden",
    "select-none",
    "focus-within:border-primary",
    className
  )

  const textareaClasses = makeClasses("w-full", "resize-none", "text-xl", "font-semibold", "nice-scrollbar")

  return (
    <div className={classes}>
      <textarea onChange={onChange} className={textareaClasses} rows={rows} {...props} />
    </div>
  )
}
