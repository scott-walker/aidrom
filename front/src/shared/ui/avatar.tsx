import type { ComponentProps, ReactNode } from "react"
import { makeClasses, makeVariants } from "@lib/style-api"
import { Icon, type IconName } from "@ui/icon"

/**
 * Пропсы аватара
 * @namespace Shared.UI.Avatar.AvatarProps
 */
export type AvatarProps = ComponentProps<"div"> & {
  size?: "sm" | "md" | "lg" | "xl"
  src?: string
  icon?: IconName
  initials?: string
  children?: ReactNode
}

/**
 * Аватар пользователя
 * @namespace Shared.UI.Avatar
 */
export const Avatar = ({
  size = "md",
  src,
  icon = "bot-message-square",
  initials,
  className = "",
  children,
  ...props
}: AvatarProps): ReactNode => {
  const getVariant = makeVariants({
    beforeClasses: makeClasses(
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "bg-primary",
      // "bg-brand-gradient",
      "text-primary-foreground",
      "overflow-hidden",
      "shrink-0",
      "flex-none",
      "aspect-square",
      "rounded-full"
    ),
    afterClasses: className,
    variants: {
      sm: "w-8 h-8 text-base",
      md: "w-12 h-12 text-lg",
      lg: "w-16 h-16 text-xl",
      xl: "w-20 h-20 text-2xl"
    }
  })

  const iconSizes = { sm: 26, md: 32, lg: 38, xl: 48 }

  return (
    <div className={getVariant(size)} {...props}>
      {src ? (
        <img src={src} className="w-3/4 h-3/4 object-cover" />
      ) : initials ? (
        <span className="font-bold uppercase">{initials.slice(0, 2)}</span>
      ) : (
        <Icon name={icon} size={iconSizes[size]} />
      )}
      {children}
    </div>
  )
}
