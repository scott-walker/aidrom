| **Слой**       | **Сегмент**  | **Описание семантического значения**                                                                                      |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **entities/**  | `api/`       | Контракты сущности: DTO, схемы (zod), вызовы к backend API (`getUser`, `updateUser`). Сырой доступ к данным сущности.     |
|                | `lib/`       | Чистое ядро сущности: доменные модели (`User`), мапперы (DTO ⇆ Domain), константы, утилиты. Независимо от UI.             |
|                | `model/`     | Бизнес-логика сущности: store (zustand/effector), react-query hooks, селекторы, эффекты. «Живые данные».                  |
|                | `ui/`        | UI-компоненты сущности (`UserCard`, `UserAvatar`). Декларативные, переиспользуемые.                                       |
| **features/**  | `api/`       | Вызовы API, относящиеся именно к сценарию (`login`, `register`, `addToCart`). Используют `entities/api`.                  |
|                | `lib/`       | Утилиты сценария (например, адаптеры данных формы). Чистые, без React.                                                    |
|                | `model/`     | Прикладная бизнес-логика сценария: схемы форм (zod), Form DTO, мапперы Form ⇆ Entity/DTO, react-hook-form hooks, эффекты. |
|                | `ui/`        | UI-компоненты сценария (`LoginForm`, `RegisterButton`).                                                                   |
| **widgets/**   | `lib/`       | (Необязательный сегмент) локальные утилиты, относящиеся к конкретному виджету (например, сортировка внутри таблицы).      |
|                | `model/`     | Склейка данных из `entities` и `features`. Локальные derive-данные для виджета.                                           |
|                | `ui/`        | UI-композиции из `entities` и `features` (`UserProfileWidget`, `CartWidget`).                                             |
| **pages/**     | `lib/`       | (Редко используется) утилиты для страницы, например, адаптеры данных для конкретного layout.                              |
|                | `model/`     | Склейка `widgets`, `features` и `entities` в рамках страницы. Page-level store, derive-данные.                            |
|                | `ui/`        | Layout страницы (`UserPage`, `DashboardPage`).                                                                            |
| **processes/** | `lib/`       | (Необязательный сегмент) утилиты для долгоживущих процессов.                                                              |
|                | `model/`     | Оркестраторы (auth-flow, checkout-flow), глобальные эффекты, подписки.                                                    |
|                | `ui/`        | Композиция из pages/features (`OnboardingWizard`).                                                                        |
| **app/**       | `providers/` | Провайдеры: React Query, Zustand/Effector, Theme, i18n, Router.                                                           |
|                | `routes/`    | Декларация роутов, корневые layout-компоненты.                                                                            |
|                | `config/`    | Конфиги приложения (env, endpoints, routes, feature-flags).                                                               |
|                | `index.tsx`  | Точка входа приложения.                                                                                                   |
| **shared/**    | `lib/`       | Универсальные утилиты (formatDate, debounce, logger). Чистый код.                                                         |
|                | `api/`       | Базовый API-клиент (`axios/ky/fetch`), interceptors, generic-типы ответов.                                                |
|                | `ui/`        | Design system: кнопки, инпуты, модалки, иконки, layouts.                                                                  |
|                | `config/`    | Конфиги общего уровня (endpoints, env, feature-flags).                                                                    |
|                | `types/`     | Глобальные типы и интерфейсы, доступные всем слоям.                                                                       |
