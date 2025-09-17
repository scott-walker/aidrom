import { useNavigate } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Button } from "@ui/button"
import { Icon } from "@ui/icon"

/**
 * Кнопка чата
 * @namespace Features.ChatButton.UI.ChatButton
 */
export const ChatButton = () => {
  const navigate = useNavigate()
  const buttonClasses = makeClasses("gap-3 rounded-2xl ")

  return (
    <Button schema="hard" className={buttonClasses} onClick={() => navigate("/chat")}>
      <Icon name="message-circle" size={20} strokeWidth={2.5} />
      Перейти в чат
    </Button>
  )
}
