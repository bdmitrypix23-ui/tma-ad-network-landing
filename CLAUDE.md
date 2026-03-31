# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Что это

Лендинг рекламной сети Telegram-каналов. Telegram Mini App (TMA) — открывается внутри Telegram. Мобильный формат, ширина зафиксирована на 430px.

## Команды

```bash
npm run dev        # Vite dev-сервер с HMR
npm run build      # Продакшн-сборка в dist/
npm test           # Vitest — все тесты (jsdom)
npm run lint       # ESLint
npm run preview    # Превью продакшн-сборки
```

Pre-commit хук (`.hooks/pre-commit`) запускает `npm test && npm run build` — коммит не пройдёт, если тесты или сборка сломаны.

## Стек

- **React 19** + **Vite 8** (JSX, без TypeScript)
- **Tailwind CSS 4** через `@tailwindcss/vite` плагин (конфиг — `@theme` в `src/index.css`, не `tailwind.config.js`)
- **framer-motion** — анимации, `useInView`, `animate`
- **lucide-react** — иконки
- Деплой: GitHub Pages (прод) + Netlify (эксперименты), см. раздел «Ветки и деплой»

## Ветки и деплой

| Ветка | Куда деплоится | base в Vite | Назначение |
|-------|---------------|-------------|------------|
| `main` | GitHub Pages | `/tma-ad-network-landing/` | Стабильная версия |
| `netlify` | Netlify | `/` (корень) | Эксперименты |

**Важно:** `vite.config.js` отличается между ветками — в `main` есть `base: '/tma-ad-network-landing/'`, в `netlify` его нет. При переносе изменений между ветками (cherry-pick, merge) не затирать эту разницу.

Рабочий процесс:
1. Эксперименты делать в ветке `netlify` — Netlify автоматически пересоберёт сайт при пуше
2. Когда результат устраивает — перенести изменения в `main` через cherry-pick или merge
3. GitHub Pages автоматически пересоберёт `main`

## Архитектура

Всё приложение — один файл `src/App.jsx`:
- Данные каналов и клиентов — константы в начале файла
- `FadeInView` — обёртка с появлением при скролле (IntersectionObserver через framer-motion)
- `Counter` — анимированный счётчик (framer-motion `animate`)
- `ChannelCard` — карточка канала в горизонтальном скролле, при попадании в viewport меняет `activeColor` (фоновое свечение)
- `App` — главный компонент, секции: Hero → Как работает → Каналы → Бегущая строка клиентов → Прайсинг → CTA

Стили: Tailwind-утилиты inline + кастомные классы в `src/index.css` (`.bg-grain` — шумовой оверлей, `.no-scrollbar`, `.font-unbounded`, анимация `marquee`). Файл `src/App.css` — остатки от шаблона Vite, не используется в текущем дизайне.

## Шрифты

- **Inter** — основной текст
- **Unbounded** — заголовки, цены, акценты (класс `.font-unbounded`)

Подключены через Google Fonts в `index.html`.

## Тесты

Vitest + Testing Library + jsdom. Тесты в `src/App.test.jsx`. Нужен мок `IntersectionObserver` (jsdom его не имеет) — он объявлен в начале тестового файла. Настройка среды: `src/test-setup.js` подключает jest-dom матчеры.

## Telegram WebApp

В `index.html` подключён Telegram WebApp SDK. Функция `openTelegram()` использует:
- `Telegram.WebApp.HapticFeedback` — тактильный отклик при нажатии
- `Telegram.WebApp.openTelegramLink` — открытие ссылки внутри Telegram

Фоллбэк: если SDK недоступен, `window.location.href`.
