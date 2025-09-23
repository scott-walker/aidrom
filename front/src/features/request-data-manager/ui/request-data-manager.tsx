import { useState, useMemo, type FormEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Button } from "@ui/button"
import type { RequestsFilterData } from "@entities/request"
import { ProviderFilter, SearchFilter, Limiter, SORT_ORDER_ASC, Sorter, type SorterOrder } from "@features/data-manager"

/**
 * Пропсы
 * @namespace Features.RequestDataManager.Ui.RequestDataManagerProps
 */
interface RequestDataManagerProps {
  onFilter?: (filter: RequestsFilterData) => void
  onFilterQuery?: (filter: URLSearchParams) => void
}

/**
 * Менеджер выборки данных для запросов к провайдерам
 * @namespace Features.RequestDataManager.Ui.RequestDataManager
 */
export const RequestDataManager = ({ onFilter, onFilterQuery }: RequestDataManagerProps) => {
  const [providerId, setProviderId] = useState<string | null>(null)
  const [searchById, setSearchById] = useState<string>("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SorterOrder>(SORT_ORDER_ASC)
  const [limit, setLimit] = useState<number>(20)

  const containerClasses = makeClasses(
    "flex",
    "flex-wrap",
    "align-center",
    "gap-4",
    "p-4",
    "bg-background-soft",
    "rounded-lg"
  )

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const queryParams = new URLSearchParams()

    if (providerId) {
      queryParams.set("providerId", providerId)
    }
    if (searchById) {
      queryParams.set("searchById", searchById)
    }
    if (sortField) {
      queryParams.set("sortField", sortField)
    }
    if (sortOrder) {
      queryParams.set("sortOrder", sortOrder)
    }
    if (limit) {
      queryParams.set("limit", limit.toString())
    }

    onFilter?.({
      providerId,
      searchById,
      sortField,
      sortOrder,
      limit
    })
    onFilterQuery?.(queryParams)
  }

  // Фильтр по ID запроса
  const searchFilter = useMemo(() => {
    return (
      <SearchFilter placeholder="Введите ID запроса" label="Поиск по ID" value={searchById} onChange={setSearchById} />
    )
  }, [searchById])

  // Фильтр по провайдеру
  const providerFilter = useMemo(() => {
    return <ProviderFilter providerId={providerId} onChange={setProviderId} />
  }, [providerId])

  // Сортировка
  const sorter = useMemo(() => {
    const items = [
      { label: "Токены на вход", value: "requestTokens" },
      { label: "Токены на выход", value: "responseTokens" },
      { label: "Дата создания", value: "createdAt" }
    ]

    return (
      <Sorter
        items={items}
        field={sortField}
        order={sortOrder}
        onChangeField={setSortField}
        onChangeOrder={setSortOrder}
      />
    )
  }, [sortField, sortOrder])

  // Лимитер по количеству записей
  const limiter = useMemo(() => {
    return <Limiter label="Количество запросов" value={limit} onChange={setLimit} />
  }, [limit])

  return (
    <form className={containerClasses} onSubmit={handleFilter}>
      <section>{searchFilter}</section>
      <section>{providerFilter}</section>
      <section>{sorter}</section>
      <section>{limiter}</section>
      <section>
        <Button type="submit">Фильтровать</Button>
      </section>
    </form>
  )
}
