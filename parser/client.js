import puppeteer from "puppeteer"
import fs from "fs"

export const useClient = async (options) => {
  options = options || {}

  const userDataDir = options.userDataDir || null

  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: false, // чтобы видеть процесс
    defaultViewport: null,
    slowMo: 20, // немного замедляем все действия
    userDataDir, // Свой профиль браузера
    args: [
      "--start-maximized", // запуск на полный экран
      "--disable-notifications", // отключает Web Notifications API
      "--disable-save-password-bubble", // убирает "Сохранить пароль" / "Смените пароль"
      "--disable-session-crashed-bubble", // Убирает «восстановить страницы?»
      "--disable-infobars", // убирает служебную надпись сверху
      "--disable-popup-blocking", // убирает блокировщик попапов
      "--disable-geolocation", // отключает запросы на геолокацию
      "--no-default-browser-check", // убирает "Сделать Chrome браузером по умолчанию"
      "--disable-blink-features=AutomationControlled", // маскирует факт автоматизации
      "--disable-features=PasswordManagerOnboarding,PasswordLeakDetection", // Отключает предупреждение про утечку
      "--password-store=basic" // Убирает интеграцию с системным хранилищем паролей
    ]
  })

  const openPage = async (url) => {
    const page = await browser.newPage()

    // Дополнительно можно программно запретить уведомления на уровне страницы
    const context = browser.defaultBrowserContext()
    await context.overridePermissions(url, []) // запрещаем всё

    // Немного маскируем Puppeteer
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false })
    })

    console.log("Открываем сайт...")
    await page.goto(url, { waitUntil: "networkidle0" })

    return page
  }

  return {
    browser,
    openPage
  }
}
