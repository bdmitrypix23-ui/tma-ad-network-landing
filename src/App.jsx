import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const channels = [
  { name: "Pussy Shit", subs: "49.9K", reach: "12K", color: "#FF6B9D", emoji: "🍑", desc: "2D Булочки" },
  { name: "Horny shit", subs: "30.3K", reach: "8K", color: "#4ADE80", emoji: "🌵", desc: "Кринж дрочка мемы" },
  { name: "Буба Клаб", subs: "83.7K", reach: "15K", color: "#A855F7", emoji: "🍑", desc: "Мемный 18+ контент" },
  { name: "Shitty Kitty", subs: "79.3K", reach: "14K", color: "#EF4444", emoji: "🍄", desc: "Тут нет котов" },
  { name: "Канал 5", subs: "25K", reach: "6K", color: "#F59E0B", emoji: "⚡", desc: "Заглушка" },
  { name: "Канал 6", subs: "18K", reach: "4K", color: "#06B6D4", emoji: "🔥", desc: "Заглушка" },
  { name: "Канал 7", subs: "15K", reach: "3K", color: "#EC4899", emoji: "💀", desc: "Заглушка" },
  { name: "Канал 8", subs: "12K", reach: "2.5K", color: "#8B5CF6", emoji: "👀", desc: "Заглушка" },
  { name: "Канал 9", subs: "10K", reach: "2K", color: "#10B981", emoji: "🎯", desc: "Заглушка" },
  { name: "Канал 10", subs: "8K", reach: "1.5K", color: "#F43F5E", emoji: "🫠", desc: "Заглушка" },
];

const trustedClients = ["Топор", "Пекарня Рифмы", "Панси", "Денис Борисов", "Wylsacom"];

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
              50 000
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
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center bg-white/[0.03] rounded-2xl p-4 gap-2 border border-white/5">
                <span className="font-unbounded font-bold text-3xl text-white">
                  <Counter from={0} to={1} />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Пост</span>
              </div>
              <div className="flex flex-col items-center bg-white/[0.03] rounded-2xl p-4 gap-2 border border-white/5">
                <span className="font-unbounded font-bold text-3xl text-white">
                  <Counter from={0} to={10} />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Каналов</span>
              </div>
              <div className="flex flex-col items-center bg-white/[0.03] rounded-2xl p-4 gap-2 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 blur-xl pointer-events-none"></div>
                <span className="font-unbounded font-bold text-3xl text-white relative z-10">
                  <Counter from={0} to={50} suffix="K" />
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest relative z-10">Просмотров</span>
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
            {/* spacer for last item padding */}
            <div className="min-w-[16px] snap-center shrink-0"></div>
          </div>
        </section>

        {/* 4. Marquee Clients */}
        <section className="flex flex-col gap-8 overflow-hidden -mx-4 py-8 bg-white/[0.02] border-y border-white/[0.05]">
          <div className="flex gap-12 w-fit animate-marquee">
            {/* Repeat list 4 times for seamless loop */}
            {[...trustedClients, ...trustedClients, ...trustedClients, ...trustedClients].map((client, i) => (
              <span key={i} className="font-unbounded font-medium text-xl w-max text-white/20 uppercase whitespace-nowrap">
                {client}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Pricing: Typography / Linear Style */}
        <section className="flex flex-col px-4">
          <FadeInView>
            <div className="relative group rounded-[32px] p-[1px] overflow-hidden bg-white/10">
              {/* Outer gradient border simulator */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, ${activeColor === 'transparent' ? 'rgba(255,255,255,0.2)' : activeColor} 0%, transparent 40%)`
                }}
              />
              
              <div className="relative bg-[#050505] rounded-[31px] p-8 flex flex-col gap-8 h-full">
                
                {/* Dynamic Inner Glow */}
                <div 
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-[250px] h-[150px] blur-[60px] pointer-events-none transition-colors duration-1000"
                  style={{ backgroundColor: activeColor === 'transparent' ? 'rgba(255,255,255,0.1)' : activeColor, opacity: 0.15 }}
                />

                <div className="flex justify-between items-start relative z-10">
                  <span className="font-unbounded font-medium text-[10px] text-white/60 uppercase tracking-[0.15em] border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.02]">
                    Пакет "всё сразу"
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2 relative z-10 -mt-2">
                  <span className="font-unbounded font-black text-[5rem] leading-none text-white tracking-tighter">$150</span>
                  <span className="text-white/30 text-sm font-medium uppercase tracking-widest block transform -translate-y-2">/ пост</span>
                </div>
                
                <ul className="flex flex-col gap-5 w-full text-white/60 relative z-10 pt-4">
                  <li className="flex items-start gap-4">
                    <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">01</span>
                    <div className="flex flex-col gap-1 pb-5 border-b border-white/5 w-full">
                      <span className="text-white font-medium text-[15px]">10 каналов разом</span>
                      <span className="text-[13px] text-white/40 leading-snug">Без долгих переговоров и подбора сеток</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">02</span>
                    <div className="flex flex-col gap-1 pb-5 border-b border-white/5 w-full">
                      <span className="text-white font-medium text-[15px]">1/24 или 2/48 формат</span>
                      <span className="text-[13px] text-white/40 leading-snug">Максимальное время в топе без перебивки</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-unbounded font-bold text-white/20 mt-0.5 text-sm">03</span>
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-white font-medium text-[15px]">~50 000 просмотров</span>
                      <span className="text-[13px] text-white/40 leading-snug">Чистый гарантированный охват аудитории</span>
                    </div>
                  </li>
                </ul>
              </div>
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
      className="shrink-0 w-[280px] snap-center bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 flex flex-col gap-6 relative overflow-hidden transition-all duration-500"
      style={{
        boxShadow: isInView ? `0 0 50px -15px ${channel.color}40` : 'none',
        borderColor: isInView ? `${channel.color}50` : 'rgba(255,255,255,0.1)'
      }}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: channel.color, opacity: isInView ? 0.4 : 0 }}
      ></div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
        >
          {channel.emoji}
        </div>
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
