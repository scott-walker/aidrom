import { useEffect, useState } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Туман в диалог чата
 * @namespace Widgets.Chat
 */
export const ChatDialogFog = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 800)

    return () => clearTimeout(timer)
  }, [])

  const fogClasses = makeClasses(
    "absolute",
    "z-10",
    "inset-0",
    "pointer-events-none",
    "bg-background",
    "animate-[fade-out_ease-in-out_0.5s_1_0.15s_forwards]"
  )

  if (isVisible) return <div className={fogClasses} />

  return null
}
