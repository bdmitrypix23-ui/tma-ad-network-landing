# Хорошие паттерны дизайна

Креативность — первая, техника — вторая. Сначала реши КАК это будет выглядеть и чем запомнится, потом полируй детали.

## Содержание

### Креативность (читать ПЕРВЫМ при создании UI)
1. [Типографика с характером](#1-типографика-с-характером)
2. [Цвет и настроение](#2-цвет-и-настроение)
3. [Атмосферные фоны](#3-атмосферные-фоны)
4. [Нестандартные layout](#4-нестандартные-layout)
5. [Анимация как акцент](#5-анимация-как-акцент)

### Принципы (компактно после креативности)
Иерархия, Контраст, Ритм, Whitespace

### Рецепты
6. [Хороший hover](#6-хороший-hover)
7. [Текстовая иерархия](#7-текстовая-иерархия)
8. [Разделение контента](#8-разделение-контента)
9. [Состояния элементов](#9-состояния-элементов)
10. [Тёмная тема](#10-тёмная-тема)
11. [Адаптивная типографика](#11-адаптивная-типографика)
12. [Микро-детали что отличают](#12-микро-детали)

---

## Креативность

Эта секция — самая важная. AI склонен к безопасным дефолтам. Твоя задача — сделать интерфейс **самобытным и запоминающимся**. Не "правильным" — а таким, чтобы пользователь сказал "вау, это красиво".

Перед тем как писать CSS, выбери **эстетическое направление** и следуй ему:
- Organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, retro-futuristic
- Это не декорация — это фундамент всех решений (шрифт, цвет, spacing, анимации)

**Ключевой вопрос: что пользователь запомнит?** Если ответ "ничего" — ты ещё не начал дизайн. CSS-арт кота > жёлтый круг. Характерный шрифт > generic sans-serif. Необычный layout > центрированные блоки.

### 1. Типографика с характером

Шрифт задаёт 50% настроения интерфейса. Generic шрифты (Inter, Roboto, Arial, системные) = generic результат.

**Принцип:** пара шрифтов — display (характерный, для заголовков) + body (читабельный, для текста). Третий — mono для кода/цифр, если нужен.

**Банк шрифтов по настроению:**
- Элегантный: Cormorant Garamond, Playfair Display, Source Serif 4
- Современный: Outfit, Sora, General Sans, Satoshi
- Брутальный: Bebas Neue, Unbounded, Space Grotesk (но не каждый раз!)
- Ретро: Abril Fatface, Bodoni Moda, DM Serif Display
- Технический: JetBrains Mono, IBM Plex Mono, Fira Code
- Игривый: Fredoka, Lexend, Nunito

**Правило:** никогда не выбирай один и тот же шрифт дважды подряд в разных проектах. Каждый проект — новая пара.

```css
/* Пример: editorial feel */
font-family: 'Cormorant Garamond', 'Georgia', serif;      /* display */
font-family: 'Outfit', 'Helvetica Neue', sans-serif;       /* body */
font-family: 'JetBrains Mono', 'Courier New', monospace;   /* code */
```

Всегда указывай fallback — на 3G Google Fonts загружаются секунды.

### 2. Цвет и настроение

Не выбирай цвета "красиво". Выбирай под настроение: агрессивный, спокойный, роскошный, технический.

**Принцип:** доминирующий цвет + острый акцент работает лучше, чем равномерно распределённая палитра.

**Подходы:**
- **Монохром + 1 акцент** — самый надёжный. Тёмно-серая база, один яркий цвет для CTA/выделений
- **Аналоговая палитра** — соседние цвета на круге (синий + фиолетовый + индиго). Спокойно, гармонично
- **Высокий контраст** — чёрный + один неоновый. Драматично, запоминается
- **Из контекста** — цвета IDE тем (Dracula, Monokai, Nord), культурных эстетик (wabi-sabi, synthwave, art deco)

```css
/* Монохром + акцент (надёжный) */
:root {
  --bg: hsl(220 15% 8%);
  --surface: hsl(220 15% 12%);
  --text: hsl(220 10% 90%);
  --accent: hsl(0 85% 55%);        /* один яркий */
  --accent-muted: hsl(0 40% 35%);  /* приглушённый для фонов */
}

/* Высокий контраст (запоминается) */
:root {
  --bg: #0a0a0a;
  --text: #f0f0f0;
  --accent: #00ff88;               /* неон на чёрном */
}
```

Используй CSS variables для всех цветов — консистентность важнее креативности в отдельных местах.

### 3. Атмосферные фоны

Сплошной цвет — скучно. Но AI лепит кричащие градиенты. Золотая середина — subtle атмосфера.

**Рецепты:**

```css
/* Radial glow — мягкий свет из центра */
body {
  background: #0a0a0a;
  background-image: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(var(--accent-rgb), 0.15),
    transparent
  );
}

/* Noise texture — убирает "цифровую" гладкость */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* Grid pattern — техно-эстетика */
.hero {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Gradient mesh — мягкие цветовые пятна */
body {
  background: #0a0a0a;
  background-image:
    radial-gradient(at 20% 30%, hsla(280, 60%, 30%, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 70%, hsla(200, 60%, 30%, 0.1) 0px, transparent 50%);
}
```

Правило: фон должен быть subtle. Если заметен при чтении текста — слишком громкий.

### 4. Нестандартные layout

AI генерит предсказуемые layout: centered hero → 3 cards → features list → CTA → footer. Ломай шаблон.

**Приёмы:**
- **Асимметрия** — текст слева занимает 60%, визуал справа 40%. Не 50/50.
- **Overlap** — элемент выходит за границы секции, наезжает на следующую
- **Diagonal flow** — `clip-path` или `transform: skewY(-3deg)` на секции
- **Broken grid** — один элемент сознательно выбивается из сетки
- **Sticky элемент** — заголовок секции sticky слева, контент скроллится справа

```css
/* Overlap — картинка наезжает на следующую секцию */
.hero-image {
  margin-bottom: -80px;
  position: relative;
  z-index: 1;
}

/* Diagonal section break */
.section-angled {
  clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);
  padding: 80px 0;
}

/* Asymmetric split */
.split {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;
}
```

Правило: один нестандартный приём на страницу. Два — уже хаос.

### 5. Анимация как акцент

Анимация — не "добавить polish". Это инструмент внимания: одна хорошо оркестрированная анимация загрузки лучше десяти разбросанных hover-эффектов.

**Оркестрированная загрузка:**
```css
/* Staggered reveal — элементы появляются последовательно */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.6s ease forwards;
}
.reveal:nth-child(1) { animation-delay: 0.1s; }
.reveal:nth-child(2) { animation-delay: 0.2s; }
.reveal:nth-child(3) { animation-delay: 0.3s; }

@keyframes revealUp {
  to { opacity: 1; transform: translateY(0); }
}
```

**Scroll-triggered reveal** (через JS):
```css
.fade-in {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Правила:
- Одна оркестрированная анимация на загрузку страницы (staggered delays)
- Scroll reveals — ок, но subtle (translateY(16px), не 40px)
- Hover анимации — только feedback, не шоу
- `prefers-reduced-motion` — всегда уважай

---

## Принципы (компактно)

- **Иерархия** — один главный элемент на экране. 3-4 уровня шрифта max. Если карточка яркая — текст рядом спокойный
- **Контраст** — не только цвет. Крупное рядом с мелким, плотное рядом с пустым, яркое среди нейтральных
- **Ритм** — отступы кратные 4 или 8 (4, 8, 16, 24, 48, 64). CSS variables для повторяющихся значений
- **Whitespace** — связанные элементы ближе, несвязанные дальше. Отступ между группами > внутри группы

---

## Рецепты

### 6. Хороший hover

Hover должен давать feedback, не устраивать шоу.

```css
/* Кнопка — смена фона, быстро */
@media (hover: hover) {
  .button:hover {
    background-color: var(--accent-hover);
    transition: background-color 0.15s ease;
  }
}

/* Карточка-ссылка — subtle lift */
@media (hover: hover) {
  .card-link:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}

/* Текстовая ссылка — underline offset */
a:hover {
  text-decoration-color: var(--accent);
  text-underline-offset: 3px;
}
```

Правила:
- `@media (hover: hover)` — обязательно, на мобилке hover залипает
- `translateY(-2px)` а не `-8px`. Subtle, не dramatic.
- transition на конкретное свойство, не `all`

### 7. Текстовая иерархия

Три уровня текста покрывают почти всё:

```css
/* Заголовки — максимальный контраст */
h1, h2, h3 {
  color: var(--text-primary);    /* почти белый в dark / почти чёрный в light */
  font-weight: 700;
  letter-spacing: -0.02em;       /* крупный текст — чуть сжать */
}

/* Основной текст */
p, li {
  color: var(--text-secondary);  /* чуть приглушён */
  font-weight: 400;
  line-height: 1.6;
}

/* Мета, подписи, timestamps */
.meta, .caption, time {
  color: var(--text-tertiary);   /* ещё тише */
  font-size: 0.85em;
  font-weight: 400;
}
```

Не используй больше 3 уровней. Если нужен четвёртый — скорее всего третий можно убрать.

### 8. Разделение контента

Разделитель не обязан быть линией. Есть 4 способа, от тонкого к грубому:

```css
/* 1. Пустое пространство (лучший вариант) */
.section + .section { margin-top: 48px; }

/* 2. Разница в фоне */
.section:nth-child(even) {
  background: hsl(220 15% 8%);
}

/* 3. Тонкая линия (если пространство ограничено) */
.divider {
  border: none;
  border-top: 1px solid hsl(220 10% 18%);
  margin: 24px 0;
}

/* 4. Тень (только если элемент floating) */
/* Используй только для sticky/fixed элементов */
```

### 9. Состояния элементов

У интерактивных элементов 5 состояний. AI обычно делает 2 (default + hover).

```css
.button {
  /* Default */
  background: var(--accent);
  color: white;
  transition: background-color 0.15s ease;
}

@media (hover: hover) {
  .button:hover {
    /* Hover — чуть светлее/темнее */
    background: var(--accent-hover);
  }
}

.button:active {
  /* Active — нажата, визуальный feedback */
  transform: scale(0.98);
}

.button:focus-visible {
  /* Focus — keyboard navigation */
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.button:disabled {
  /* Disabled — приглушить */
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 10. Тёмная тема

Тёмная тема — не "инвертируй цвета". Это отдельная палитра.

**Правила:**
- Фон НЕ чисто чёрный (#000). Используй тёмно-серый с лёгким оттенком: `hsl(220 15% 8%)`
- Текст НЕ чисто белый (#fff). Используй `hsl(220 10% 90%)` — мягче для глаз
- Elevation = светлее (не темнее как в light theme). Карточка чуть светлее фона.
- Тени почти не видны на тёмном — замени на border: `1px solid hsl(220 10% 15%)`

```css
:root {
  --bg-base: hsl(220 15% 7%);
  --bg-surface: hsl(220 15% 10%);      /* карточки, sidebar */
  --bg-elevated: hsl(220 15% 13%);     /* dropdown, modal */
  --border-subtle: hsl(220 10% 16%);
  --text-primary: hsl(220 10% 93%);
  --text-secondary: hsl(220 10% 65%);
  --text-tertiary: hsl(220 10% 45%);
}
```

#### Цветные тёмные темы (forest, nord, amber и т.д.)

Главная ошибка — красить всю нейтральную шкалу в цвет темы. Получается "фильтр поверх экрана": зелёный фон, зелёный текст, зелёные бордеры — всё сливается, нет контраста, попапы неотличимы от фона.

**Принцип: идентичность темы — через accent, не через нейтрали.**

В dark mode нейтральная шкала (bg, surface, borders, text) должна быть **почти серой** с минимальным whisper оттенка (насыщенность 5-10%, не 30-50%). Тему определяют accent-цвета (secondary, tertiary) — они яркие и насыщенные.

**Контрольные точки lightness (эталон):**
- bg (--light): ~3-5%
- surface (--lightgray): ~12-15% — **шаг минимум +7-10%** от bg
- borders (--gray): ~40-44%
- body text (--darkgray): ~77-81%
- headings (--dark): ~89-95%

Если шаг bg → surface меньше 7% — попапы, карточки, elevated-элементы визуально сольются с фоном.

```css
/* ПЛОХО — "зелёный фильтр", всё одного оттенка */
--light: #0e1610;      /* зелёный bg */
--lightgray: #1a2e1a;  /* зелёный surface — шаг +4.6%, сливается */
--gray: #5a7855;       /* зелёный */
--darkgray: #b8d4b2;   /* зелёный */

/* ХОРОШО — нейтрали с whisper, accent несёт идентичность */
--light: #0c0f0c;      /* почти чёрный, чуть-чуть зелени */
--lightgray: #1e261f;  /* шаг +10%, surface чётко отделён */
--gray: #5e6e60;       /* десатурированный серо-зелёный */
--darkgray: #c0cec2;   /* читаемый текст */
--secondary: #66bb6a;  /* ВОТ ТУТ зелёный — яркий accent */
```

**Чеклист для цветной тёмной темы:**
1. Шаг bg → surface >= 7% lightness
2. Насыщенность нейтралей <= 10%
3. Accent (secondary/tertiary) — яркий и насыщенный, это лицо темы
4. Попапы/elevated элементы используют surface (--lightgray), не bg (--light)

### 11. Адаптивная типографика

Не ставь фиксированные px для заголовков. clamp() решает.

```css
h1 {
  font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  line-height: 1.1;
}

h2 {
  font-size: clamp(1.25rem, 1rem + 1vw, 2rem);
  line-height: 1.2;
}

p {
  font-size: clamp(0.95rem, 0.9rem + 0.2vw, 1.1rem);
  line-height: 1.6;
}
```

Правила:
- `line-height` уменьшается с ростом font-size (крупный заголовок = 1.1, body = 1.6)
- `letter-spacing` отрицательный для крупного текста (-0.02em), нейтральный для body

### 12. Микро-детали

Мелочи, которые отличают "сделано руками" от "сгенерировано":

```css
/* Текстовый accent вместо фонового */
.tag {
  color: var(--accent);
  font-weight: 500;
  /* НЕ background: var(--accent); color: white; padding: 4px 12px; border-radius: 9999px; */
}

/* Разная толщина бордеров */
.card { border: 1px solid var(--border-subtle); }
.card-featured { border-width: 2px; }

/* Negative letter-spacing на заголовках */
h1 { letter-spacing: -0.03em; }

/* Мягкий text-shadow вместо font-weight: 900 */
.hero-title {
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Подчёркивание с кастомным цветом */
a {
  text-decoration: underline;
  text-decoration-color: rgba(var(--accent-rgb), 0.3);
  text-underline-offset: 2px;
  transition: text-decoration-color 0.2s;
}
a:hover {
  text-decoration-color: var(--accent);
}
```

---

## Проверенные эталоны

Реальные примеры из проектов которые юзер одобрил. Используй как строительные блоки — бери элемент, адаптируй под контекст. НЕ копируй целые layout.

### E1. Карточки с индивидуальным характером

Каждая карточка имеет свой цвет и CSS-арт иконку. Не одинаковые!

```css
/* Базовая карточка — тёмная поверхность, subtle border */
.card {
  background: hsl(0 0% 10%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 8px;
  overflow: hidden;
}

/* Thumbnail-зона с уникальным radial glow */
.card-thumb {
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Каждая карточка — свой цвет через CSS variable */
.card[data-theme="crimson"] .card-thumb {
  background: radial-gradient(circle at 50% 50%, rgba(139, 26, 26, 0.3), transparent 70%);
}
.card[data-theme="emerald"] .card-thumb {
  background: radial-gradient(circle at 50% 50%, rgba(26, 139, 76, 0.3), transparent 70%);
}
.card[data-theme="golden"] .card-thumb {
  background: radial-gradient(circle at 50% 50%, rgba(139, 120, 26, 0.3), transparent 70%);
}

/* CSS-арт иконка (геометрия, не emoji) */
.card-icon {
  width: 64px;
  height: 64px;
  border: 2px solid currentColor;
  border-radius: 50%;      /* круг для рулетки */
  /* или border-radius: 0; transform: rotate(45deg); — ромб для блэкджека */
}

/* Текст внизу — два уровня */
.card-title { color: #fff; font-weight: 600; font-size: 1rem; }
.card-subtitle { color: hsl(0 0% 50%); font-size: 0.8rem; }
```

**Почему хорошо:** карточки узнаваемы по-отдельности, каждая — свой персонаж. AI обычно делает все одинаковыми.

### E2. Hover с появлением CTA

CTA-кнопка скрыта в покое, появляется при hover. Чисто в дефолте, интерактивно при наведении.

```css
.card-cta {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

@media (hover: hover) {
  .card:hover .card-cta {
    opacity: 1;
    pointer-events: auto;
  }
  .card:hover .card-thumb {
    filter: brightness(0.7);
    transition: filter 0.3s ease;
  }
}
```

**Почему хорошо:** интерфейс не перегружен кнопками. Hover даёт feedback без visual noise.

### E3. Оркестрированная загрузка (curtain + staggered)

Элементы появляются последовательно, каждый со своим эффектом. Не fade-in на всём.

```css
/* Кастомный easing — экспоненциальный, feels premium */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Curtain reveal — элемент "раскрывается" сверху вниз */
@keyframes curtainReveal {
  0% { clip-path: inset(0 0 100% 0); opacity: 0; }
  100% { clip-path: inset(0 0 0 0); opacity: 1; }
}

/* Fade + scale — появление с лёгким увеличением */
@keyframes fadeScale {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Slide from left — для логотипа */
@keyframes slideFromLeft {
  0% { transform: translateX(-60px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

/* Staggered delays — каждый элемент позже */
.reveal { opacity: 0; transform: translateY(32px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* Живые декоративные элементы */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

**Почему хорошо:** страница "оживает" при загрузке. Каждый элемент имеет свой момент. Кастомный easing (`ease-out-expo`) делает движение premium, не generic.

### E4. Категории с монохром + один акцент

Сетка карточек-категорий: все серые, одна выделена цветом. CSS-арт иконки вместо emoji.

```css
/* Все карточки — нейтральные */
.category-card {
  background: hsl(0 0% 10%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
}

.category-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  color: hsl(0 0% 40%);  /* серый по умолчанию */
}

/* Одна карточка — акцент */
.category-card.featured {
  border-color: var(--accent);
}
.category-card.featured .category-icon {
  color: var(--accent);  /* только иконка цветная */
}

/* Текст: название + количество */
.category-name { font-weight: 600; color: #fff; }
.category-count { font-size: 0.8rem; color: hsl(0 0% 50%); }
```

**Почему хорошо:** иерархия через один цветной акцент. Глаз сразу видит главное. AI обычно красит всё одинаково.

### E5. Animated underline на навигации

Подчёркивание растёт от центра при hover. Не instant, не generic.

```css
.nav-link {
  position: relative;
  color: hsl(0 0% 60%);
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s var(--ease-out-expo), left 0.3s var(--ease-out-expo);
}

@media (hover: hover) {
  .nav-link:hover { color: #fff; }
  .nav-link:hover::after {
    width: 100%;
    left: 0;
  }
}
```

**Почему хорошо:** деталь которая делает навигацию живой. Мелочь, но запоминается.

### E6. Тройной radial-gradient фон

Фон из нескольких мягких цветовых пятен — создаёт глубину без gradient overlay.

```css
.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(var(--accent-rgb), 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 20% 80%, rgba(var(--accent-rgb), 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 80% 70%, rgba(212, 162, 76, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* Маска чтобы градиенты растворялись к краям */
.hero-bg::before {
  mask-image: radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 40%, black, transparent);
}
```

**Почему хорошо:** атмосфера без "AI gradient overlay". Мягкие пятна, не полоса 135deg. Маска растворяет к краям — нет жёстких границ.
