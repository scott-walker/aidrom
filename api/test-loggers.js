import { createControllerLogger, createServiceLogger, httpLogger, dbLogger, apiLogger } from "./src/utils/logger.js"

// Тестируем логгеры для контроллеров
const userController = createControllerLogger("UserController")
const authController = createControllerLogger("AuthController")

// Тестируем логгеры для сервисов
const userService = createServiceLogger("UserService")
const authService = createServiceLogger("AuthService")

console.log("=== Тестирование системы логгирования с автоматическим определением методов ===\n")

// Тест контроллеров с автоматическим определением методов
const testUserController = () => {
  userController.info("Пользователь авторизовался", { userId: 123, ip: "192.168.1.1" })
  userController.warn("Попытка доступа к защищенному ресурсу", { userId: 456, resource: "/admin" })
  userController.error("Ошибка при создании пользователя", { error: "Email уже существует" })
}

const testAuthController = () => {
  authController.info("Попытка входа в систему", { email: "user@example.com" })
  authController.error("Неверный пароль", { email: "user@example.com", attempts: 3 })
}

testUserController()
testAuthController()

console.log("\n--- Тест сервисов с автоматическим определением методов ---\n")

// Тест сервисов с автоматическим определением методов
const testUserService = () => {
  userService.info("Создание нового пользователя", { email: "new@example.com", name: "John" })
  userService.info("Пользователь успешно создан", { userId: 789, email: "new@example.com" })
  userService.warn("Пользователь не найден", { email: "unknown@example.com" })
}

const testAuthService = () => {
  authService.info("Проверка токена", { token: "jwt_token_123" })
  authService.error("Токен истек", { token: "expired_token", expiredAt: "2024-01-01" })
}

testUserService()
testAuthService()

console.log("\n--- Тест специализированных логгеров ---\n")

// Тест HTTP логгера
httpLogger.info("HTTP запрос", { method: "GET", url: "/api/users", status: 200, duration: "45ms" })
httpLogger.error("HTTP ошибка", { method: "POST", url: "/api/auth", status: 500, error: "Internal Server Error" })

// Тест DB логгера
dbLogger.info("Подключение к БД установлено", { database: "postgresql", host: "localhost" })
dbLogger.info("Запрос выполнен", { query: "SELECT * FROM users", duration: "12ms" })
dbLogger.error("Ошибка БД", { query: "INSERT INTO users", error: "Duplicate key" })

// Тест AI логгера
apiLogger.info("Запрос к AI отправлен", { bot: "gemini", prompt: "Привет, как дела?" })
apiLogger.info("Ответ от AI получен", { bot: "gemini", cost: 0.05, tokens: 150 })
apiLogger.error("Ошибка AI API", { bot: "claude", error: "Rate limit exceeded" })

console.log("\n=== Тест завершен ===")
