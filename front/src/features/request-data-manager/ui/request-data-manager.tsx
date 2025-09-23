import { useState } from "react"
import { makeClasses } from "@lib/style-api"
import { Json } from "@ui/json"
import { ProviderFilter, SearchFilter, SORT_ORDER_ASC, Sorter, type SorterOrder } from "@features/data-manager"

/**
 * Менеджер выборки данных для запросов к провайдерам
 * @namespace Features.RequestDataManager.Ui.RequestDataManager
 */
export const RequestDataManager = () => {
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SorterOrder>(SORT_ORDER_ASC)
  const [providerId, setProviderId] = useState<string | null>(null)

  const containerClasses = makeClasses(
    "flex",
    "flex-wrap",
    "align-center",
    "gap-4",
    "p-4",
    "bg-background-soft",
    "rounded-lg"
  )
  const sorterItems = [
    { label: "Токены на запрос", value: "requestTokens" },
    { label: "Токены на ответ", value: "responseTokens" },
    { label: "Дата создания", value: "createdAt" }
  ]

  const data = {
    search,
    sortField,
    sortOrder,
    providerId
  }

  return (
    <>
      <div className={containerClasses}>
        <section>
          <SearchFilter placeholder="Введите ID запроса" label="Поиск по ID" value={search} onChange={setSearch} />
        </section>
        <section>
          <ProviderFilter providerId={providerId} onChange={setProviderId} />
        </section>
        <section>
          <Sorter
            items={sorterItems}
            field={sortField}
            order={sortOrder}
            onChangeField={setSortField}
            onChangeOrder={setSortOrder}
          />
        </section>
      </div>
      <div className="p-4 w-full">
        <Json value={data} />
      </div>
    </>
  )
}
