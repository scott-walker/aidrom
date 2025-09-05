| **Слой**       | **Сегмент** | **Описание семантического значения**                                                                                                    |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **entities/**  | `api/`      | Контракты сущности: DTO, схемы (zod), вызовы к backend API (getUser, updateUser).                                                       |
|                | `lib/`      | Чистое ядро сущности: доменные модели (`User`), мапперы (DTO ⇆ Domain), константы, утилиты.                                             |
|                | `model/`    | Бизнес-логика сущности: store, react-query hooks, селекторы, эффекты. «Живые данные».                                                   |
|                | `ui/`       | Dumb/Smart UI-компоненты сущности (UserCard, UserAvatar).                                                                               |
| **features/**  | `api/`      | Вызовы API, связанные именно с этим сценарием (например, `login`, `register`, `addToCart`). Обычно прокидывают данные в `entities/api`. |
|                | `lib/`      | Утилиты, которые относятся к сценарию, но остаются чистыми (например, форматирование полей для конкретной формы).                       |
|                | `model/`    | Прикладная бизнес-логика сценария: form schema (zod), Form DTO, мапперы Form ⇆ Entity/DTO, react-hook-form hooks, эффекты.              |
|                | `ui/`       | Конкретные UI-компоненты сценария: формы, кнопки действия (RegisterForm, LoginButton).                                                  |
| **pages/**     | `model/`    | Склейка фич и сущностей: page-store, query-хуки для страницы, derive-данные.                                                            |
|                | `ui/`       | Layout страницы (UserPage, DashboardPage).                                                                                              |
| **processes/** | `model/`    | Долгоживущие сценарии: orchestrators (auth-flow, checkout-flow), глобальные эффекты.                                                    |
|                | `ui/`       | Композиция из features/pages (например, OnboardingWizard).                                                                              |
| **shared/**    | `lib/`      | Универсальные утилиты (formatDate, debounce, logger).                                                                                   |
|                | `api/`      | Базовый API-клиент (ky, axios instance), interceptors.                                                                                  |
|                | `ui/`       | Design system: кнопки, инпуты, иконки, layouts.                                                                                         |
|                | `config/`   | Конфиги приложения (endpoints, env, constants).                                                                                         |
