import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { LISBAR_CONTAINER_CLASS, CHAT_CONTAINER_CLASS, INFOPBAR_CONTAINER_CLASS } from "../lib/constants"

/**
 * Пропсы интерфейса чата
 * @namespace Features.ChatInterface.UI.ChatPortalProps
 */
interface ChatPortalProps {
  children: ReactNode
  listbar?: ReactNode
  infobar?: ReactNode
}

/**
 * Интерфейс чата
 * @namespace Features.ChatInterface.UI.ChatPortal
 */
export const ChatPortal = ({ children, listbar, infobar }: ChatPortalProps) => {
  const [containers, setContainers] = useState<ReactNode[]>([])

  useEffect(() => {
    const listbarContainer = document.querySelector(`.${LISBAR_CONTAINER_CLASS}`)
    const chatContainer = document.querySelector(`.${CHAT_CONTAINER_CLASS}`)
    const infobarContainer = document.querySelector(`.${INFOPBAR_CONTAINER_CLASS}`)
    const containers: ReactNode[] = []

    if (listbar && listbarContainer) {
      containers.push(createPortal(listbar, listbarContainer))
    }
    if (children && chatContainer) {
      containers.push(createPortal(children, chatContainer))
    }
    if (infobar && infobarContainer) {
      containers.push(createPortal(infobar, infobarContainer))
    }

    setContainers(containers)
  }, [listbar, children, infobar])

  return <>{containers.map(container => container)}</>
}
