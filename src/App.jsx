import React, { useState, useEffect, useRef } from 'react';
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
  { name: "Модели 30+", count: 30, label: "30+" },
  { name: "Булошная 18+", count: 20, label: "20+" },
  { name: "MODIYA", count: 20, label: "20+" },
  { name: "Топор 18+", count: 12, label: "12" },
  { name: "Steam Community", count: 11, label: "11" },
  { name: "4ch", count: 6, label: "6" },
  { name: "Раздеватор бот", count: 4, label: "4" },
  { name: "ВРОТ АИ", count: 3, label: "3" },
  { name: "Пездуза", count: 3, label: "3" },
  { name: "DOTA 2", count: 3, label: "3" },
  { name: "Рифмы и Игры", count: 2, label: "2" },
  { name: "Рифмы и Панчи", count: 2, label: "2" },
  { name: "VPN Анон", count: 2, label: "2" },
  { name: "VPN Персик", count: 1, label: "1" },
];

function getChipStyle(count) {
  if (count >= 20) return "text-[15px] px-5 py-2.5 font-semibold text-white";
  if (count >= 5) return "text-[13px] px-4 py-2 font-medium text-white";
  return "text-[11px] px-3 py-1.5 font-medium text-white/70";
}

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
  const style = getChipStyle(client.count);
  return (
    <div className={`flex-auto flex items-center justify-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl ${style}`}>
      <span>{client.name}</span>
      <span className="text-white/30">· {client.label} размещений</span>
    </div>
  );
}

export default function App() {
  const [activeColor, setActiveColor] = useState("transparent");

  return (
    <div className="relative min-h-screen bg-grain overflow-x-hidden flex flex-col font-sans">
      
      {/* Dynamic Radial Background */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ease-out opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 80%)`
        }}
        initial={false}
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 80%)`
        }}
      />

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

        {/* 3. Channels */}
        <section className="flex flex-col gap-6 -mx-4 relative">
          <FadeInView className="px-4">
             <h2 className="font-unbounded font-bold text-2xl text-white text-center">Площадки</h2>
          </FadeInView>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-4 gap-3">
            {channels.map((ch, i) => (
              <ChannelCard
                key={i}
                channel={ch}
                onInView={(isInView) => {
                  if (isInView) setActiveColor(ch.color);
                }}
              />
            ))}
            {/* "Другие" summary card */}
            <div className="shrink-0 w-[280px] snap-center bg-[#080808] rounded-3xl p-6 border border-white/[0.06] flex flex-col gap-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-white/[0.05] text-white/40">
                  +5
                </div>
                <div className="flex flex-col">
                  <h3 className="font-unbounded font-bold text-lg text-white leading-tight mb-0.5">Другие</h3>
                  <span className="text-xs font-medium text-white/40">ещё 5 каналов в сетке</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {otherChannels.map((ch, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm text-white/60">{ch.name}</span>
                    <span className="font-unbounded text-xs text-white/30">{ch.subs}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-[16px] snap-center shrink-0"></div>
          </div>
        </section>

        {/* 4. Trusted Clients */}
        <section className="flex flex-col gap-6">
          <FadeInView>
            <h2 className="font-unbounded font-bold text-2xl text-white text-center">Нам доверяют</h2>
          </FadeInView>
          <FadeInView>
            <div className="flex flex-wrap gap-2">
              {trustedClients.map((client) => (
                <ClientChip key={client.name} client={client} />
              ))}
            </div>
          </FadeInView>
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

// Channel Card Component
function ChannelCard({ channel, onInView }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% -50% -20% -50%", amount: 0.6 });

  useEffect(() => {
    onInView(isInView);
  }, [isInView]);

  return (
    <div 
      ref={ref}
      className="shrink-0 w-[280px] snap-center bg-[#080808] rounded-3xl p-6 border border-white/[0.06] flex flex-col gap-6 relative overflow-hidden transition-all duration-500"
    >
      {/* Dynamic Inner Glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-[40px] pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: channel.color, opacity: isInView ? 0.25 : 0 }}
      ></div>
      
      <div className="flex items-center gap-4 relative z-10">
        {channel.logo ? (
          <img
            src={`${BASE}logos/${channel.logo}`}
            alt={channel.name}
            className="w-14 h-14 rounded-2xl object-cover shrink-0"
          />
        ) : (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
          >
            {channel.emoji}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-unbounded font-bold text-lg text-white leading-tight mb-0.5">{channel.name}</h3>
          <span className="text-xs font-medium text-white/40">{channel.desc}</span>
        </div>
      </div>

      <div className="flex gap-2 relative z-10">
        <div className="flex-1 bg-white/[0.03] rounded-2xl p-3 flex flex-col gap-1.5 border border-white/[0.02]">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Подписчики</span>
          <span className="font-unbounded font-medium text-sm text-white">{channel.subs}</span>
        </div>
        <div className="flex-1 bg-white/[0.03] rounded-2xl p-3 flex flex-col gap-1.5 border border-white/[0.02]">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Охват</span>
          <span className="font-unbounded font-medium text-sm text-white">{channel.reach}</span>
        </div>
      </div>
    </div>
  );
}
