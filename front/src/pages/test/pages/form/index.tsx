import { useState, type ReactNode } from "react"
import type { PageConfig } from "@lib/page-api"
import { createPage } from "@lib/page-api"
import { Input } from "@shared/ui/input"
import { Button } from "@ui/button"
import { Select } from "@ui/select"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "Form"
  }
}

/**
 * Главная страница тестирования
 */
export const FormPage = createPage(config, (): ReactNode => {
  const [selectedValue, setSelectedValue] = useState("apple")
  const selectItems = [
    { label: "Банан", value: "banana" },
    { label: "Яблоко", value: "apple" },
    { label: "Апельсин", value: "orange" },
    { label: "Киви", value: "kiwi" },
    { label: "Груша", value: "pear" },
    { label: "Персик", value: "peach" }
  ]

  return (
    <div className="flex flex-col">
      <div className="flex align-center gap-4 flex-wrap">
        <Input
          placeholder="Email"
          type="email"
          value={selectedValue}
          onChange={({ target }) => setSelectedValue(target.value)}
        />
        <Input error={true} placeholder="Поле с ошибкой" />
        <Select items={selectItems} value={selectedValue} onChangeValue={setSelectedValue} />
        <Button schema="primary">Отправить</Button>
      </div>
    </div>
  )
})
