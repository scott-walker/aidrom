import { useState } from "react"
import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Tooltip } from "@ui/tooltip"
import { Button } from "@ui/button"
import { Select } from "@ui/select"
import { Heading } from "@ui/heading"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "Main"
  }
}

/**
 * Главная страница тестирования
 */
export const MainPage = createPage(config, (): ReactNode => {
  const [outlined, setOutlined] = useState(false)
  const [selectedValue1, setSelectedValue1] = useState("apple")
  const [selectedValue2, setSelectedValue2] = useState("banana")
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
      <p className="text-2xl text-foreground font-family-base">
        Прямо сейчас ты находишься на главной странице тестирования компонентов
      </p>
      <div className="flex align-center gap-4 mt-10 flex-wrap">
        <Heading level={3}>{selectedValue1}</Heading>
        <Heading level={3}>{selectedValue2}</Heading>
      </div>
      <div className="flex align-center gap-4 mt-10 flex-wrap">
        <Tooltip text="Ну вот и вы тут">
          <Button schema="primary" onClick={() => setOutlined(!outlined)}>
            Наведи же!
          </Button>
        </Tooltip>

        {/* <Select schema="hard" outlined={outlined} items={selectItems} value="apple" /> */}
        <Select items={selectItems} value={selectedValue1} onChangeValue={setSelectedValue1} />
        <Select items={selectItems} value={selectedValue2} onChangeValue={setSelectedValue2} />
        {/* <Select schema="ghost" outlined={outlined} items={selectItems} value="apple" />
        <Select schema="warning" outlined={outlined} items={selectItems} value="apple" />
        <Select schema="danger" outlined={outlined} items={selectItems} value="apple" />
        <Select schema="secondary" outlined={outlined} items={selectItems} value="apple" /> */}
      </div>
    </div>
  )
})
