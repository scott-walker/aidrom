import { createControllerLogger, createServiceLogger } from "./src/utils/logger.js"

console.log("=== Тест автоматического определения методов ===\n")

// Тест контроллеров
const userController = createControllerLogger("UserController")

const loginUser = () => {
  userController.info("Пользователь авторизовался", { userId: 123 })
  userController.warn("Попытка доступа к защищенному ресурсу", { resource: "/admin" })
  userController.error("Ошибка при создании пользователя", { error: "Email уже существует" })
}

const registerUser = () => {
  userController.info("Начало регистрации пользователя", { email: "new@example.com" })
  userController.info("Пользователь успешно зарегистрирован", { userId: 456 })
}

loginUser()
registerUser()

console.log("\n--- Тест сервисов ---\n")

// Тест сервисов
const userService = createServiceLogger("UserService")

const createUser = () => {
  userService.info("Создание нового пользователя", { email: "user@example.com", name: "John" })
  userService.info("Пользователь успешно создан", { userId: 789, email: "user@example.com" })
}

const findUser = () => {
  userService.info("Поиск пользователя", { email: "user@example.com" })
  userService.warn("Пользователь не найден", { email: "unknown@example.com" })
}

createUser()
findUser()

console.log("\n=== Тест завершен ===")
