import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

const channels = [
  { name: "GIF.Chan 18+", subs: "101.9K", reach: "13.9K", color: "#FF6B9D", logo: "gifchan18.jpg", desc: "GIF контент 18+" },
  { name: "Shitty Kitty", subs: "79.1K", reach: "12.8K", color: "#EF4444", logo: "shittykitty.jpg", emoji: "🍄", desc: "Тут нет котов" },
  { name: "Буба Клаб", subs: "83.6K", reach: "7.7K", color: "#A855F7", logo: "bybaclub.jpg", desc: "Мемный контент" },
  { name: "Pussy Shit", subs: "49.8K", reach: "6.3K", color: "#F43F5E", logo: "pussyshit.jpg", desc: "2D Булочки" },
  { name: "Weeabo comics", subs: "50K", reach: "6.1K", color: "#06B6D4", logo: "weeabo.jpg", desc: "Аниме комиксы" },
  { name: "GIF.Chan", subs: "54.1K", reach: "3.8K", color: "#F59E0B", logo: "gifchan.jpg", desc: "GIF контент" },
  { name: "ANIVIBE", subs: "41K", reach: "3K", color: "#4ADE80", logo: "anivibe.jpg", desc: "Аниме мемы" },
  { name: "Horny shit", subs: "30.4K", reach: "2.4K", color: "#22C55E", emoji: "🌵", desc: "Кринж и мемы" },
  { name: "Парные авы", subs: "30.4K", reach: "1.2K", color: "#EC4899", logo: "parnyiaviy.jpg", desc: "Парные аватарки" },
];

const otherChannels = [
  { name: "Комикс-Чан", subs: "16.2K" },
  { name: "Пейринги", subs: "26.5K" },
  { name: "Horny Honkai 18+", subs: "14.1K" },
  { name: "Nu: impact", subs: "15.2K" },
  { name: "JAGO COMICS", subs: "5.8K" },
];

const trustedClients = [
  { name: "Модели 30+", count: 30, label: "30+", logo: "pussyshit.jpg" },
  { name: "Булошная 18+", count: 20, label: "20+", logo: "gifchan18.jpg" },
  { name: "MODIYA", count: 20, label: "20+", logo: "shittykitty.jpg" },
  { name: "Топор 18+", count: 12, label: "12", logo: "bybaclub.jpg" },
  { name: "Steam Community", count: 11, label: "11", logo: "weeabo.jpg" },
  { name: "4ch", count: 6, label: "6", logo: "gifchan.jpg" },
  { name: "Раздеватор бот", count: 4, label: "4", logo: "anivibe.jpg" },
  { name: "ВРОТ АИ", count: 3, label: "3", logo: "comicschan.jpg" },
  { name: "Пездуза", count: 3, label: "3", logo: "parnyiaviy.jpg" },
  { name: "DOTA 2", count: 3, label: "3", logo: "pussyshit.jpg" },
  { name: "Рифмы и Игры", count: 2, label: "2", logo: "gifchan18.jpg" },
  { name: "Рифмы и Панчи", count: 2, label: "2", logo: "shittykitty.jpg" },
  { name: "VPN Анон", count: 2, label: "2", logo: "bybaclub.jpg" },
  { name: "VPN Персик", count: 1, label: "1", logo: "weeabo.jpg" },
];

// Ряды — mix крупных и мелких для органичного вида
const clientRow1 = [trustedClients[0], trustedClients[5], trustedClients[8], trustedClients[13], trustedClients[3]];
const clientRow2 = [trustedClients[1], trustedClients[4], trustedClients[7], trustedClients[10], trustedClients[12]];
const clientRow3 = [trustedClients[2], trustedClients[6], trustedClients[9], trustedClients[11]];

function openTelegram() {
  if (window.Telegram?.WebApp?.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
  if (window.Telegram?.WebApp?.openTelegramLink) {
    window.Telegram.WebApp.openTelegramLink('https://t.me/nvrrest');
  } else {
    window.location.href = 'https://t.me/nvrrest';
  }
}

function FadeInView({ children, delay = 0, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ from = 0, to, suffix = "", duration = 2 }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          nodeRef.current.textContent = Math.round(value) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, isInView, suffix, duration]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

function ClientChip({ client }) {
  return (
    <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 shrink-0">
      <img src={`${BASE}logos/${client.logo}`} alt="" className="w-6 h-6 rounded-lg object-cover" />
      <span className="font-medium text-white text-[13px] whitespace-nowrap">{client.name}</span>
      <span className="text-white/30 text-[11px] whitespace-nowrap">· {client.label} разм.</span>
    </div>
  );
}

const allPackageChannels = [
  ...channels.map(ch => ({ name: ch.name, subs: ch.subs, logo: ch.logo })),
  ...otherChannels.map(ch => ({ name: ch.name, subs: ch.subs })),
];

function PricingFlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full" style={{ perspective: 1200 }}>
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="bg-[#080808] rounded-3xl p-8 flex flex-col gap-8 border border-white/[0.06] relative"
          style={{ backfaceVisibility: "hidden", pointerEvents: flipped ? "none" : "auto" }}
        >
          <div className="flex justify-between items-start">
            <span className="font-unbounded font-medium text-[10px] text-white/50 uppercase tracking-[0.2em] border border-white/[0.08] px-3 py-1.5 rounded-full bg-white/[0.02]">
              Максимум охвата
            </span>
          </div>

          <div className="flex items-baseline gap-2 -mt-2">
            <span className="font-unbounded font-black text-[5rem] leading-none text-white tracking-tighter">$150</span>
            <span className="text-white/30 text-sm font-medium uppercase tracking-[0.15em] block transform -translate-y-2">/ пост</span>
          </div>

          <ul className="flex flex-col gap-5 w-full text-white/60 pt-4">
            <li className="flex items-start gap-4">
              <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">01</span>
              <div className="flex flex-col gap-1 pb-5 border-b border-white/[0.04] w-full">
                <span className="text-white font-medium text-[15px]">~60 000 охват</span>
                <span className="text-[13px] text-white/40 leading-snug">Гарантированные просмотры</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">02</span>
              <div className="flex flex-col gap-1 pb-5 border-b border-white/[0.04] w-full">
                <span className="text-white font-medium text-[15px]">1/24 формат</span>
                <span className="text-[13px] text-white/40 leading-snug">Пост в топе сутки без перебивки</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">03</span>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-white font-medium text-[15px]">Ответка</span>
                <span className="text-[13px] text-white/40 leading-snug">Репост в канал рекламодателя</span>
              </div>
            </li>
          </ul>

          {/* Avatars row + flip trigger */}
          <button
            onClick={() => setFlipped(true)}
            className="flex items-center gap-3 mt-2 group"
          >
            <div className="flex -space-x-2">
              {channels.slice(0, 5).map((ch, i) => (
                <img
                  key={i}
                  src={`${BASE}logos/${ch.logo}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-[#080808] object-cover"
                />
              ))}
            </div>
            <span className="text-[13px] text-white/40 group-hover:text-white/60 transition-colors">
              14 каналов →
            </span>
          </button>

          <button
            onClick={openTelegram}
            className="w-full bg-white text-black font-unbounded font-bold text-lg h-14 rounded-2xl active:scale-95 transition-transform mt-2"
          >
            Купить
          </button>
        </div>

        {/* Back — channels list */}
        <div
          className="bg-[#080808] rounded-3xl p-8 flex flex-col gap-6 border border-white/[0.06] absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", pointerEvents: flipped ? "auto" : "none" }}
        >
          <span className="font-unbounded font-bold text-lg text-white">14 каналов</span>

          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1">
            {allPackageChannels.map((ch, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-3">
                  {ch.logo ? (
                    <img src={`${BASE}logos/${ch.logo}`} alt="" className="w-7 h-7 rounded-lg object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-white/[0.05]" />
                  )}
                  <span className="text-[15px] text-white/70">{ch.name}</span>
                </div>
                <span className="font-unbounded text-xs text-white/30">{ch.subs}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[13px] text-white/40">
            <span className="font-unbounded font-bold text-white/60">$150</span>
            <span>·</span>
            <span>1/24</span>
            <span>·</span>
            <span>~60K охват</span>
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="w-full bg-white text-black font-unbounded font-bold text-lg h-14 rounded-2xl active:scale-95 transition-transform"
          >
            Назад
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function FirstTimeBuyerAccordion() {
  const [open, setOpen] = useState(false);

  const steps = [
    { num: "1", title: "Формат", text: "Присылаешь готовый пост или описываешь идею — мы поможем оформить. Один пост идёт сразу во все каналы." },
    { num: "2", title: "Согласование", text: "Смотрим пост, при необходимости предлагаем правки. Обычно согласуем за пару часов." },
    { num: "3", title: "Оплата и запуск", text: "Оплачиваешь, выбираем дату — и пост выходит во всех каналах разом." },
  ];

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 flex justify-between items-center active:scale-[0.98] transition-transform"
      >
        <span className="text-[15px] text-white/60 font-medium text-left">Первый раз покупаешь рекламу?<br /><span className="text-white">3 простых шага</span></span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/40 text-xl"
        >
          ▾
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-4 pt-4">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-4">
              <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">{step.num}</span>
              <div className="flex flex-col gap-1">
                <span className="text-white font-medium text-[15px]">{step.title}</span>
                <span className="text-[13px] text-white/40 leading-snug">{step.text}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-grain overflow-x-hidden flex flex-col font-sans">

      {/* Main Content */}
      <main className="relative z-10 flex-col flex gap-24 pb-24 pt-12 px-4">
        
        {/* 1. Hero */}
        <section className="flex flex-col items-center text-center mt-12 gap-8">
          <FadeInView>
            <h1 className="font-unbounded font-black text-[56px] leading-[1.05] tracking-tight">
              60 000
              <br />
              <span className="text-white/40">глаз на</span>
              <br />
              твой пост
            </h1>
          </FadeInView>
          <FadeInView delay={0.1}>
            <p className="text-lg text-white/50 leading-snug max-w-[280px]">
              один рекламный пост — вся сетка каналов — весь охват в кармане
            </p>
          </FadeInView>
          <FadeInView delay={0.2} className="w-full">
            <button 
              onClick={openTelegram} 
              className="w-full bg-white text-black font-unbounded font-bold text-lg h-14 rounded-2xl active:scale-95 transition-transform"
            >
              Беру
            </button>
          </FadeInView>
        </section>

        {/* 2. How it works */}
        <section className="flex flex-col gap-8">
          <FadeInView>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center bg-[#080808] rounded-3xl p-5 gap-2 border border-white/[0.06]">
                <span className="font-unbounded font-bold text-3xl text-white">
                  <Counter from={0} to={1} />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em]">Пост</span>
              </div>
              <div className="flex flex-col items-center bg-[#080808] rounded-3xl p-5 gap-2 border border-white/[0.06]">
                <span className="font-unbounded font-bold text-3xl text-white">
                  <Counter from={0} to={14} />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em]">Каналов</span>
              </div>
              <div className="flex flex-col items-center bg-[#080808] rounded-3xl p-5 gap-2 border border-white/[0.06]">
                <span className="font-unbounded font-bold text-3xl text-white">
                  <Counter from={0} to={60} suffix="K" />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em]">Охват</span>
              </div>
            </div>
          </FadeInView>
        </section>

        {/* 4. New Pricing */}
        <section className="flex flex-col gap-8">
          <FadeInView>
            <h2 className="font-unbounded font-bold text-2xl text-white text-center">Прайс</h2>
          </FadeInView>
          <FadeInView>
            <PricingFlipCard />
          </FadeInView>

          <FadeInView delay={0.1}>
            <FirstTimeBuyerAccordion />
          </FadeInView>
        </section>

        {/* 5. Trusted Clients */}
        <section className="flex flex-col gap-4 overflow-hidden -mx-4">
          <FadeInView className="px-4">
            <h2 className="font-unbounded font-bold text-2xl text-white text-center">Нам доверяют</h2>
          </FadeInView>

          <div className="flex gap-3 w-max animate-drift-slow">
            {[...clientRow1, ...clientRow1].map((client, i) => (
              <ClientChip key={i} client={client} />
            ))}
          </div>

          <div className="flex gap-3 w-max animate-drift-medium">
            {[...clientRow2, ...clientRow2].map((client, i) => (
              <ClientChip key={i} client={client} />
            ))}
          </div>

          <div className="flex gap-3 w-max animate-drift-fast">
            {[...clientRow3, ...clientRow3].map((client, i) => (
              <ClientChip key={i} client={client} />
            ))}
          </div>
        </section>

        {/* 5. Pricing: Unified Premium Minimalist */}
        <section className="flex flex-col px-4">
          <FadeInView>
            <div className="bg-[#080808] rounded-3xl p-8 flex flex-col gap-8 border border-white/[0.06]">
              <div className="flex justify-between items-start">
                <span className="font-unbounded font-medium text-[10px] text-white/50 uppercase tracking-[0.2em] border border-white/[0.08] px-3 py-1.5 rounded-full bg-white/[0.02]">
                  Пакет "всё сразу"
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 -mt-2">
                <span className="font-unbounded font-black text-[5rem] leading-none text-white tracking-tighter">$150</span>
                <span className="text-white/30 text-sm font-medium uppercase tracking-[0.15em] block transform -translate-y-2">/ пост</span>
              </div>
              
              <ul className="flex flex-col gap-5 w-full text-white/60 pt-4">
                <li className="flex items-start gap-4">
                  <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">01</span>
                  <div className="flex flex-col gap-1 pb-5 border-b border-white/[0.04] w-full">
                    <span className="text-white font-medium text-[15px]">14 каналов разом</span>
                    <span className="text-[13px] text-white/40 leading-snug">Без долгих переговоров и подбора сеток</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">02</span>
                  <div className="flex flex-col gap-1 pb-5 border-b border-white/[0.04] w-full">
                    <span className="text-white font-medium text-[15px]">1/24 или 2/48 формат</span>
                    <span className="text-[13px] text-white/40 leading-snug">Максимальное время в топе без перебивки</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">03</span>
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-white font-medium text-[15px]">~60 000 просмотров</span>
                    <span className="text-[13px] text-white/40 leading-snug">Чистый гарантированный охват аудитории</span>
                  </div>
                </li>
              </ul>
            </div>
          </FadeInView>
        </section>

        {/* 6. CTA */}
        <section className="flex flex-col items-center gap-4 mt-4 relative">
          <FadeInView className="w-full relative z-10">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-105 pointer-events-none transition-opacity"></div>
            <button 
              onClick={openTelegram} 
              className="relative w-full bg-white text-black font-unbounded font-bold text-xl h-16 rounded-2xl active:scale-95 transition-transform flex items-center justify-center"
            >
              Разместиться
            </button>
          </FadeInView>
          <FadeInView delay={0.1} className="relative z-10">
            <span className="text-white/30 text-sm font-medium tracking-wide">ответ в течение часа</span>
          </FadeInView>
        </section>

      </main>
    </div>
  );
}

