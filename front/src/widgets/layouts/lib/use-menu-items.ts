import type { MenuItems } from "./types"

// Основное меню
const menuItems: MenuItems = [
  {
    label: "Панель",
    icon: "gauge",
    path: "/"
  },
  {
    label: "Сервис",
    icon: "settings",
    path: "/service/providers"
  }
]

// Меню для разработки
const chatMenuItems: MenuItems = [
  {
    label: "Чат",
    icon: "messages-square",
    path: "/chat"
  },
  {
    label: "Агенты",
    icon: "bot",
    path: "/agents"
  }
]

// Меню для разработки
const developmentMenuItems: MenuItems = [
  {
    label: "Разработка",
    icon: "code",
    path: "/test"
  }
]

/**
 * Хук для получения меню
 * @namespace Widgets.Layouts.Lib.useMenuItems
 */
export const useMenuItems = () => {
  return {
    menuItems,
    chatMenuItems,
    developmentMenuItems
  }
}
