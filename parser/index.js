import path from "path"
import { useHelper } from "./helper.js"
import { useClient } from "./client.js"
import { usePrompt } from "./prompt.js"

// Функция случайной задержки
// const delay = () => new Promise((res) => res())

const run = async () => {
  const url = "https://chat.deepseek.com/"
  // const url = "https://support.google.com/"
  const { delay } = useHelper()
  const client = await useClient({
    userDataDir: path.resolve("./chrome-profile")
  })
  const page = await client.openPage(url)

  await delay(1000, 3000)
  // await page.click(".promoted-search__input")
  await page.click("#chat-input")

  await usePrompt("Запрос: ", async (input) => {
    for (const char of input) {
      await page.keyboard.type(char)
      await delay(50, 100)
    }

    await page.keyboard.press("Enter")
  })

  // process.exit(0)
  // return

  // Имитируем ввод логина
  // console.log("Вводим логин...")
  // await page.click("#user-name")
  // for (let char of "standard_user") {
  //   await page.keyboard.type(char)
  //   // await delay(50, 150)
  // }

  // Имитируем ввод пароля
  // console.log("Вводим пароль...")
  // await page.click("#password")
  // for (let char of "secret_sauce") {
  //   await page.keyboard.type(char)
  //   // await delay(50, 150)
  // }

  // console.log("Нажимаем кнопку входа с плавным движением мыши...")
  // const loginBtn = await page.$("#login-button")
  // const btnBox = await loginBtn.boundingBox()
  // await moveMouseSmoothly(page, 0, 0, btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2)
  // await loginBtn.click()

  // console.log("Ждём загрузки списка товаров...")
  // await page.waitForSelector(".inventory_item")

  // // Скроллим страницу вниз плавно
  // // console.log("Плавный скролл вниз...")
  // // for (let i = 0; i < 5; i++) {
  // //   await page.mouse.wheel({ deltaY: 200 })
  // //   await delay(200, 500)
  // // }

  // // const item = await page.$("#item_4_title_link")
  // // await item.click()

  // // Кликаем по случайному товару
  // const items = await page.$$(".inventory_item_label a")
  // const randomIndex = Math.floor(Math.random() * items.length)
  // console.log(`Кликаем по товару #${randomIndex + 1}`)

  // const itemBox = await items[randomIndex].boundingBox()
  // await moveMouseSmoothly(page, btnBox.x, btnBox.y, itemBox.x + itemBox.width / 2, itemBox.y + itemBox.height / 2)
  // await items[randomIndex].click()
  // console.log("Готово! Можно наблюдать процесс :)")
}

run()
