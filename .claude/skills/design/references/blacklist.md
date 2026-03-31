# Чёрный список AI-слоп паттернов

Каждый паттерн здесь — это то, что модели генерят по дефолту. Результат: все AI-интерфейсы выглядят одинаково. Если ловишь себя на чём-то из списка — стоп, бери альтернативу.

## Содержание

1. [Цветная полоска слева](#1-цветная-полоска-слева)
2. [Видимые скроллбары](#2-видимые-скроллбары)
3. [Gradient overlay на всём](#3-gradient-overlay-на-всём)
4. [Glass-morphism везде](#4-glass-morphism-везде)
5. [Одинаковые карточки](#5-одинаковые-карточки)
6. [Pill-shaped кнопки](#6-pill-shaped-кнопки)
7. [Purple-blue градиент](#7-purple-blue-градиент)
8. [Гигантские отступы](#8-гигантские-отступы)
9. [Generic hero секция](#9-generic-hero-секция)
10. [Анимации на всём](#10-анимации-на-всём)
11. [Bento grid](#11-bento-grid)
12. [Emoji как иконки](#12-emoji-как-иконки)
13. [Тень на каждом элементе](#13-тень-на-каждом-элементе)
14. [Одинаковый border-radius](#14-одинаковый-border-radius)
15. [Neon glow на всём](#15-neon-glow-на-всём)
16. [Хаос font-size](#16-хаос-font-size)
17. [Gradient text](#17-gradient-text)
18. [uppercase + letter-spacing везде](#18-uppercase--letter-spacing-везде)
19. [Несовместимые цвета](#19-несовместимые-цвета)
20. [Бесконечные анимации](#20-бесконечные-анимации)
21. [Одна анимация на всё](#21-одна-анимация-на-всё)
22. [Один угол градиента](#22-один-угол-градиента)
23. [Dashed/dotted border как декор](#23-dasheddotted-border-как-декор)

---

## 1. Цветная полоска слева

**Забанено:**
```css
.nav-item.active {
  border-left: 3px solid var(--accent);
}
```

**Почему слоп:** AI-клише #1. Каждый чатбот, каждый генератор лепит это на active/selected элементы.

**Вместо:**
```css
/* Фоновая подсветка */
.nav-item.active {
  background: rgba(var(--accent-rgb), 0.08);
  color: var(--accent);
}

/* Или контраст через opacity */
.nav-item { opacity: 0.6; }
.nav-item.active { opacity: 1; font-weight: 600; }
```

---

## 2. Видимые скроллбары

**Забанено:** дефолтные серые скроллбары в sidebar, панелях, вспомогательных блоках.

**Вместо:**
```css
.scrollable {
  scrollbar-width: none; /* Firefox */
}
.scrollable::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
```

Если индикатор скролла реально нужен — тонкий, полупрозрачный, только при наведении:
```css
.scrollable::-webkit-scrollbar { width: 3px; }
.scrollable::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.2);
  border-radius: 3px;
}
.scrollable:hover::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.4);
}
```

---

## 3. Gradient overlay на всём

**Забанено:**
```css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.card::after {
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
}
```

**Почему слоп:** градиент стал AI-дефолтом. Особенно 135deg фиолетово-голубой. Если на странице 3+ градиента — это слоп.

**Вместо:**
- Solid colors с хорошим контрастом. Один акцентный цвет сильнее чем градиент из двух.
- Если градиент нужен — используй subtle (разница между цветами < 10% по lightness), не rainbow.
- Overlay на изображениях — solid `rgba()`, не gradient.

```css
/* Subtle gradient — ок */
.surface {
  background: linear-gradient(180deg, hsl(220 15% 12%) 0%, hsl(220 15% 10%) 100%);
}

/* Solid overlay на картинке — ок */
.hero-image::after {
  background: rgba(0, 0, 0, 0.55);
}
```

---

## 4. Glass-morphism везде

**Забанено:**
```css
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```
на каждой карточке, каждом модале, каждой панели.

**Почему слоп:** glass-morphism — крутой эффект, но AI лепит его на ВСЁ. Когда всё стеклянное — ничего не стеклянное.

**Вместо:** Glass максимум на 1-2 элементах (header, один floating элемент). Остальное — solid backgrounds с разницей в lightness.

```css
/* Header — glass ок, это один элемент */
.header {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
}

/* Карточки — solid, не glass */
.card {
  background: hsl(220 15% 13%);
  border: 1px solid hsl(220 10% 18%);
}
```

---

## 5. Одинаковые карточки

**Забанено:** 6+ карточек в grid, все с идентичным padding, shadow, radius, hover effect.

**Почему слоп:** ленивый layout. Реальный дизайн использует вариацию — разные размеры, акценты, иерархию.

**Вместо:**
- Варьируй размер: featured карточка больше остальных
- Варьируй акцент: одна карточка с бордером, другие без
- Разная плотность контента — не заставляй все быть одного размера
- Если карточки реально одинаковые по данным — хотя бы убери hover-эффект и сделай минимально

```css
/* Featured + обычные */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.card.featured {
  grid-column: span 2;
  border: 1px solid var(--accent);
}
```

---

## 6. Pill-shaped кнопки

**Забанено:**
```css
.button {
  border-radius: 9999px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}
```

**Почему слоп:** pill + gradient = визитная карточка AI-генерации. Особенно с 32px+ горизонтальным padding.

**Вместо:**
```css
/* Скромный radius */
.button {
  border-radius: 6px;
  padding: 8px 16px;
  background: var(--accent);
}

/* Или ghost button */
.button {
  border-radius: 4px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
```

---

## 7. Purple-blue градиент

**Забанено:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(to right, #6366f1, #8b5cf6);
```

**Почему слоп:** это буквально дефолт каждого AI-генератора. #667eea → #764ba2 — как Comic Sans для градиентов.

**Вместо:** выбирай цвета под контекст. Если нет брендовых цветов — используй один solid цвет. Монохром > генерик-градиент.

---

## 8. Гигантские отступы

**Забанено:**
```css
.section { padding: 80px 0; }
.container { padding: 0 60px; }
.card { padding: 32px; }
```

**Почему слоп:** AI модели перестраховываются с "breathing room". Результат — страница из 70% whitespace и 30% контента.

**Вместо:** отступы пропорциональны контенту. Маленький компонент = маленький padding. Секция = medium. Hero = можно больше, но не 120px.

```css
.card { padding: 16px; }        /* компактно */
.section { padding: 48px 0; }   /* секция */
.hero { padding: 64px 0; }      /* hero — чуть больше */
```

---

## 9. Generic hero секция

**Забанено:**
```html
<section class="hero">
  <h1>Welcome to [Product]</h1>
  <p>The best solution for your needs</p>
  <button>Get Started</button>
</section>
```
с центрированным текстом, gradient background, и CTA button.

**Почему слоп:** шаблон #1 каждого AI-лендинга. Центрированный текст + пафосный подзаголовок + одна кнопка.

**Вместо:**
- Асимметричный layout (текст слева, визуал справа)
- Конкретный заголовок вместо generic ("Переводи 200 страниц за 3 минуты" вместо "The best translation tool")
- Несколько CTA или вообще без CTA — сразу контент
- Split hero (50/50 или 60/40)

---

## 10. Анимации на всём

**Забанено:**
```css
* { transition: all 0.3s ease; }
.card { animation: fadeInUp 0.6s ease; }
```

**Почему слоп:** AI добавляет transition/animation на всё "для polish". Результат — вялый, тормозной UI где всё плавает.

**Вместо:**
- Transition только на конкретные свойства: `transition: opacity 0.2s, transform 0.2s`
- Анимации — только где есть смысл (появление контента при скролле, feedback на действие)
- Длительность 0.15-0.25s для UI, 0.3-0.5s для декоративных
- `transition: all` — никогда

```css
.button {
  transition: background-color 0.15s ease, color 0.15s ease;
}
```

---

## 11. Bento grid

**Забанено:** grid из прямоугольников разного размера (a la Apple marketing pages) для обычного контента.

**Почему слоп:** стало AI-дефолтом для "modern layout". Но bento работает только когда контент реально разного веса. Для списка фич — это оверкилл.

**Вместо:** простой grid или list. Bento — только если есть 1-2 крупных элемента + мелочь, и это оправдано контентом.

---

## 12. Emoji как иконки

**Забанено:**
```html
<div class="feature-icon">&#x1F680;</div>
```

**Почему слоп:** рендерится по-разному на каждой OS. Выглядит несерьёзно. AI лепит emoji потому что не может генерить SVG.

**Вместо:** SVG иконки (Lucide, Heroicons, Phosphor) или текстовые символы. Если иконка не нужна — не ставь, текст тоже работает.

---

## 13. Тень на каждом элементе

**Забанено:**
```css
.card { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.button { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.header { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
```

**Почему слоп:** когда тень на всём — она ничего не выделяет. Просто шум.

**Вместо:** тень — для elevation. Один уровень за раз. Карточки НЕ floating по дефолту — это flat элементы. Тень — для dropdown, modal, toast.

```css
/* Только для элементов с реальной elevation */
.dropdown { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); }
.modal { box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2); }

/* Карточки — бордер, не тень */
.card { border: 1px solid hsl(220 10% 18%); }
```

---

## 14. Одинаковый border-radius

**Забанено:**
```css
.card { border-radius: 16px; }
.button { border-radius: 16px; }
.input { border-radius: 16px; }
.avatar { border-radius: 16px; }
```

**Почему слоп:** AI ставит один и тот же radius на всё. Результат — "bubbly" интерфейс без иерархии.

**Вместо:** radius зависит от размера элемента. Маленький элемент = маленький radius.

```css
.avatar { border-radius: 50%; }   /* круг для аватаров — ок */
.button { border-radius: 4px; }   /* мелкий элемент */
.input { border-radius: 6px; }    /* поле ввода */
.card { border-radius: 8px; }     /* карточка */
.modal { border-radius: 12px; }   /* крупный контейнер */
```

---

## 15. Neon glow на всём

**Забанено:**
```css
.card { box-shadow: 0 0 20px rgba(230, 57, 70, 0.3); }
.button { box-shadow: 0 0 30px rgba(230, 57, 70, 0.3); }
.header { box-shadow: 0 0 10px rgba(230, 57, 70, 0.3); }
.section { box-shadow: 0 0 25px var(--border-glow); }
```

**Почему слоп:** AI лепит цветной `box-shadow: 0 0 Xpx` на каждый элемент. Результат — всё "светится", ничего не выделяется. Выглядит как неоновая вывеска из 90-х.

**Вместо:** glow максимум на 1 элементе (CTA или hero-акцент). Остальное — border или ничего.

```css
/* Glow только на главном CTA */
.cta-primary { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.25); }

/* Остальное — subtle border */
.card { border: 1px solid hsl(0 0% 16%); }
```

---

## 16. Хаос font-size

**Забанено:** 10+ разных font-size на странице без системы.
```css
/* 18 разных размеров — реальный пример AI-слопа */
font-size: 0.8rem;   font-size: 0.85rem;  font-size: 0.9rem;
font-size: 0.95rem;  font-size: 1rem;     font-size: 1.1rem;
font-size: 1.2rem;   font-size: 1.5rem;   font-size: 1.8rem;
font-size: 2rem;     font-size: 2.2rem;   font-size: 2.5rem;
font-size: 3rem;     /* и так далее... */
```

**Почему слоп:** AI выдумывает размер для каждого элемента отдельно. Нет шкалы → нет ритма → выглядит "набросано".

**Вместо:** 4-5 уровней через CSS variables + `clamp()` для responsive:

```css
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.85rem);
  --text-sm: clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem);
  --text-base: clamp(0.95rem, 0.9rem + 0.2vw, 1.1rem);
  --text-lg: clamp(1.25rem, 1rem + 1vw, 2rem);
  --text-xl: clamp(1.75rem, 1.2rem + 2vw, 3rem);
}
```

---

## 17. Gradient text

**Забанено:**
```css
h1 {
  background: linear-gradient(135deg, #ffffff 0%, #f0942c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Почему слоп:** AI-клише для "красивого заголовка". Особенно белый→цветной. Читабельность падает, на некоторых фонах текст исчезает.

**Вместо:** solid color для текста. Если нужен акцент — выдели одно слово цветом, не весь заголовок.

```css
h1 { color: #fff; }
h1 em { color: var(--accent); font-style: normal; }
```

---

## 18. uppercase + letter-spacing везде

**Забанено:**
```css
.title { text-transform: uppercase; letter-spacing: 2px; }
.subtitle { text-transform: uppercase; letter-spacing: 1px; }
.label { text-transform: uppercase; letter-spacing: 1px; }
.nav { text-transform: uppercase; letter-spacing: 0.5px; }
.footer { text-transform: uppercase; letter-spacing: 1px; }
```

**Почему слоп:** AI ставит uppercase на всё "для серьёзности". 5+ uppercase на странице = КРИЧАЩИЙ ТЕКСТ КОТОРЫЙ НЕВОЗМОЖНО ЧИТАТЬ.

**Вместо:** uppercase максимум на 1-2 элементах (nav, один badge). Остальное — иерархия через font-size и font-weight.

```css
/* uppercase допустим */
.badge { text-transform: uppercase; letter-spacing: 0.05em; font-size: var(--text-xs); }

/* всё остальное — normal case */
h1, h2, h3 { text-transform: none; }
```

---

## 19. Несовместимые цвета

**Забанено:** 3+ акцентных цвета из разных палитр на одном экране.
```css
:root {
  --accent-red: #e63946;     /* тёплый красный */
  --accent-orange: #f0942c;  /* тёплый оранжевый */
  --accent-green: #00bfa5;   /* холодный бирюзовый — КОНФЛИКТ */
}
```

**Почему слоп:** AI добавляет "разнообразие цветов". Результат — цветовая каша. Бирюзовые чекмарки на оранжевом фоне выглядят как ошибка.

**Вместо:** 1 акцент + нейтральная шкала. Максимум 2 акцента, но из одной температуры (оба тёплые или оба холодные).

```css
:root {
  --accent: #e63946;
  --accent-muted: rgba(230, 57, 70, 0.15);
  /* чекмарки, иконки — тем же акцентом или нейтральным */
}
```

---

## 20. Бесконечные анимации

**Забанено:**
```css
.button::after { animation: shimmer 3s infinite; }
.decoration { animation: float 6s ease-in-out infinite; }
.icon { animation: pulse 2s infinite; }
```

**Почему слоп:** AI ставит `infinite` на декоративные анимации. Вечно дёргающиеся элементы раздражают и отвлекают от контента.

**Вместо:** `infinite` только для индикаторов загрузки. Декор — однократно при появлении.

```css
/* Загрузка — ок, infinite оправдан */
.spinner { animation: spin 1s linear infinite; }

/* Декор — один раз при scroll reveal */
.decoration { animation: floatIn 0.8s ease forwards; }
```

---

## 21. Одна анимация на всё

**Забанено:**
```css
.hero { animation: slideUp 1s ease-out; }
.card { animation: slideUp 1s ease-out; }
.stat { animation: slideUp 1s ease-out; }
.testimonial { animation: slideUp 1s ease-out; }
```

**Почему слоп:** AI знает один `slideUp`/`fadeIn` и ставит его на каждый элемент с одинаковым timing. Всё появляется одновременно — нет оркестрации.

**Вместо:** разные эффекты + staggered delays (см. эталон E3 в good-patterns.md):
- Hero: `curtainReveal` или `fadeScale`
- Логотип: `slideFromLeft`
- Карточки: `fadeScale` со staggered delay 0.1s
- Каждый элемент — свой момент

---

## 22. Один угол градиента

**Забанено:**
```css
.hero { background: linear-gradient(135deg, ...); }
.card { background: linear-gradient(135deg, ...); }
.button { background: linear-gradient(135deg, ...); }
.section { background: linear-gradient(135deg, ...); }
/* 7x linear-gradient(135deg) — реальный пример */
```

**Почему слоп:** AI дефолтит в 135deg на каждом градиенте. Весь сайт "наклонён" в одну сторону.

**Вместо:** если градиент нужен — варьируй угол и тип. Но лучше radial-gradient для фонов (мягче, атмосфернее):

```css
/* Разные направления для разных целей */
.hero-bg { background: radial-gradient(ellipse at 50% 0%, ...); }  /* сверху вниз */
.card { background: linear-gradient(180deg, ...); }                 /* вертикально */
```

---

## 23. Dashed/dotted border как декор

**Забанено:**
```css
.promo-block {
  border: 2px dashed var(--accent);
  border-radius: 12px;
}
```

**Почему слоп:** dashed border = "купон" из 2005 года. AI лепит его на промо-блоки и баннеры.

**Вместо:** solid border (1px, subtle) или вообще без border — используй разницу в фоне.

```css
.promo-block {
  background: hsl(0 0% 10%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 8px;
}
```
