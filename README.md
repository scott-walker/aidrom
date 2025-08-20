# AIDrom

Полигон для испытаний AI моделей

### Задачи
- Добавить TraceID для логирования `NGINX -> API -> Response` 
- Рефакторинг модели обработчиков запросов к агентам
- Добавить валидацию тела запроса
- Логирование фронта по API

## GATEWAY

- Найти способ развернуть в контейнере без прокси сервера на хосте

**Генерация dev-сертификатов**
Используется `mkcert` для локальной разработки
```sh
sudo apt install libnss3-tools
sudo apt install mkcert
mkcert -install
mkcert aidrom.lc api.aidrom.lc
```
Сертификаты складываем в директорию `./gateway/ssl`

В `/etc/hosts` добавляем:
```
127.0.0.1 aidrom.lc api.aidrom.lc
```




## API

## Frontend

Иконки: https://lucide.dev/icons/plane
