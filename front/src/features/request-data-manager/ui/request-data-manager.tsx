import { useState, useMemo, type FormEvent, useEffect } from "react"
import { makeClasses } from "@lib/style-api"
import { Button } from "@ui/button"
import type { RequestsFilterData } from "@entities/request"
import {
  SORT_ORDER_DESC,
  ProviderFilter,
  SearchFilter,
  Limiter,
  Sorter,
  type SorterOrder
} from "@features/data-manager"
import { RequestClear } from "@features/request-clear"
import { RequestDelete } from "@features/request-delete"

/**
 * Пропсы
 * @namespace Features.RequestDataManager.Ui.RequestDataManagerProps
 */
interface RequestDataManagerProps {
  onFilter?: (filter: RequestsFilterData) => void
  onFilterQuery?: (filter: URLSearchParams) => void
  initialFilter?: RequestsFilterData
}

/**
 * Менеджер выборки данных для запросов к провайдерам
 * @namespace Features.RequestDataManager.Ui.RequestDataManager
 */
export const RequestDataManager = ({ initialFilter, onFilter, onFilterQuery }: RequestDataManagerProps) => {
  const items = useMemo(
    () => [
      { label: "Дата создания", value: "createdAt" },
      { label: "Токены на вход", value: "requestTokens" },
      { label: "Токены на выход", value: "responseTokens" }
    ],
    []
  )

  const [providerId, setProviderId] = useState<string | null>(initialFilter?.providerId ?? null)
  const [searchById, setSearchById] = useState<string>(initialFilter?.searchById ?? "")
  const [sortField, setSortField] = useState<string | null>(initialFilter?.sortField ?? items[0].value)
  const [sortOrder, setSortOrder] = useState<SorterOrder>((initialFilter?.sortOrder as SorterOrder) ?? SORT_ORDER_DESC)
  const [limit, setLimit] = useState<number>(initialFilter?.limit ?? 20)

  const filters = useMemo<RequestsFilterData>(
    () => ({
      providerId,
      searchById,
      sortField,
      sortOrder,
      limit
    }),
    [providerId, searchById, sortField, sortOrder, limit]
  )

  const containerClasses = makeClasses(
    "flex",
    "flex-wrap",
    "align-center",
    "gap-4",
    "p-4",
    "bg-background-soft",
    "rounded-lg"
  )

  /**
   * Обработка фильтрации
   * @namespace Features.RequestDataManager.Ui.RequestDataManager.handleFilter
   */
  const handleFilter = () => {
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

    onFilter?.(filters)
    onFilterQuery?.(queryParams)
  }

  /**
   * Обработка отправки формы
   * @namespace Features.RequestDataManager.Ui.RequestDataManager.handleSubmit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleFilter()
  }

  useEffect(() => handleFilter(), [])

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
    return (
      <Sorter
        items={items}
        field={sortField}
        order={sortOrder}
        onChangeField={setSortField}
        onChangeOrder={setSortOrder}
      />
    )
  }, [items, sortField, sortOrder])

  // Лимитер по количеству записей
  const limiter = useMemo(() => {
    return <Limiter label="Количество запросов" value={limit} onChange={setLimit} />
  }, [limit])

  return (
    <form className={containerClasses} onSubmit={handleSubmit}>
      <section>{searchFilter}</section>
      <section>{providerFilter}</section>
      <section>{sorter}</section>
      <section>{limiter}</section>

      <div className="flex items-center gap-4 w-full border-t border-border pt-4">
        <Button type="submit">Фильтровать</Button>
        <div className="flex items-center gap-4 ml-4">
          <RequestDelete filters={filters} />
          <RequestClear />
        </div>
      </div>
    </form>
  )
}
