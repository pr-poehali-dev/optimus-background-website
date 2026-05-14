import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MARQUEE_TEXT =
  "ДОБРО ПОЖАЛОВАТЬ В САМОЕ СЕРДЦЕ НАШЕГО ТЕХЦЕНТРА ПОД УПРАВЛЕНИЕМ ИСКУССТВЕННОГО ИНТЕЛЛЕКТА  ✦  ";

const AI_GREETING = "Здравствуйте. Я — AI-система управления техцентром. Готов помочь вам с диагностикой и записью на обслуживание.";

export default function Index() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(AI_GREETING.slice(0, i + 1));
        i++;
        if (i >= AI_GREETING.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a0f]">

      {/* Фоновое изображение — Оптимус Прайм */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/5dbf1b72-d5f2-481d-9dae-482b14f265ad/files/ff11a6cd-48d4-4a01-9c99-341012abc401.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Туман — многослойный */}
      <div className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,12,25,0.98) 0%, transparent 70%),
            radial-gradient(ellipse 100% 40% at 50% 80%, rgba(0,8,18,0.92) 0%, transparent 60%),
            linear-gradient(to top, rgba(6,10,15,0.97) 0%, rgba(6,10,15,0.7) 30%, rgba(6,10,15,0.15) 60%, rgba(6,10,15,0.05) 100%),
            linear-gradient(to bottom, rgba(6,10,15,0.75) 0%, rgba(6,10,15,0.05) 15%, transparent 30%)
          `
        }}
      />

      {/* Металлическая сетка */}
      <div className="absolute inset-0 z-10 metal-grid opacity-60" />

      {/* Сканирующая линия */}
      <div className="absolute inset-0 z-10 scan-overlay overflow-hidden" />

      {/* Боковые светящиеся линии */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4), transparent)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-px z-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4), transparent)" }}
      />

      {/* HEADER */}
      <header className="relative z-30 flex items-center justify-between px-8 pt-6 pb-4">
        <div className="flex items-center gap-3 animate-fade-up">
          <div className="relative w-10 h-10 border-glow flex items-center justify-center"
            style={{ background: "rgba(0,212,255,0.07)" }}>
            <Icon name="Cpu" size={20} className="text-cyan" />
            <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-cyan" />
            <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-cyan" />
          </div>
          <div>
            <div className="font-oswald font-semibold text-white tracking-[0.15em] text-sm uppercase">АвтоТех</div>
            <div className="text-[9px] text-steel tracking-[0.3em] uppercase font-ibm">Tech Center AI</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 animate-fade-up">
          {["Услуги", "Диагностика", "О нас", "Контакты"].map((item) => (
            <button
              key={item}
              className="font-ibm text-xs tracking-[0.2em] uppercase text-steel hover:text-cyan transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-cyan glow-cyan" />
          <span className="font-ibm text-[10px] tracking-[0.25em] uppercase text-steel">AI Online</span>
        </div>
      </header>

      {/* Линия под хедером */}
      <div className="relative z-30 mx-8">
        <div className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)" }}
        />
      </div>

      {/* HERO */}
      <main className="relative z-30 flex flex-col items-center justify-center min-h-[72vh] px-6 text-center">

        {/* Угловые декоры */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-cyan opacity-40 animate-fade-up" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-cyan opacity-40 animate-fade-up" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-cyan opacity-40 animate-fade-up-delay3" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-cyan opacity-40 animate-fade-up-delay3" />

        {/* Метка */}
        <div className="animate-fade-up mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-glow"
            style={{ background: "rgba(0,212,255,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan" style={{ boxShadow: "0 0 6px #00d4ff" }} />
            <span className="font-ibm text-[10px] tracking-[0.35em] uppercase text-cyan">
              Система инициализирована
            </span>
          </div>
        </div>

        {/* Заголовок */}
        <h1
          className="font-oswald font-bold uppercase tracking-[0.06em] leading-none text-flicker animate-fade-up-delay mb-3"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
            color: "#ffffff",
            textShadow: "0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1)",
          }}
        >
          Технический центр
        </h1>

        <h2
          className="font-oswald font-light uppercase animate-fade-up-delay mb-10"
          style={{
            fontSize: "clamp(0.85rem, 2.2vw, 1.4rem)",
            color: "#00d4ff",
            textShadow: "0 0 20px rgba(0,212,255,0.5)",
            letterSpacing: "0.28em",
          }}
        >
          под управлением искусственного интеллекта
        </h2>

        {/* AI Чат-панель */}
        <div className="animate-fade-up-delay2 w-full max-w-xl">
          <div
            className="relative border-glow px-6 py-5 text-left"
            style={{ background: "rgba(0,12,25,0.78)", backdropFilter: "blur(14px)" }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan" />

            <div className="flex items-center gap-2 mb-3 pb-3"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="w-6 h-6 border-glow flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.1)" }}>
                <Icon name="Bot" size={12} className="text-cyan" />
              </div>
              <span className="font-ibm text-[10px] tracking-[0.25em] uppercase text-steel">AI Ассистент</span>
              <div className="ml-auto flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan glow-cyan" />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,212,255,0.3)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,212,255,0.15)" }} />
              </div>
            </div>

            <p className="font-ibm text-sm leading-relaxed text-white/90 min-h-[2.5rem]">
              {displayedText}
              {(isTyping || displayedText.length === 0) && (
                <span className="cursor-blink ml-0.5 text-cyan font-bold">|</span>
              )}
            </p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-4 mt-8 animate-fade-up-delay3 justify-center">
          <button
            className="group relative font-oswald font-medium uppercase tracking-[0.2em] text-sm px-8 py-3 text-[#060a0f] transition-all duration-300"
            style={{ background: "#00d4ff", boxShadow: "0 0 24px rgba(0,212,255,0.45)" }}
          >
            <span className="flex items-center gap-2">
              <Icon name="Zap" size={14} />
              Записаться
            </span>
          </button>

          <button
            className="font-oswald font-light uppercase tracking-[0.2em] text-sm px-8 py-3 text-cyan border border-cyan/30 hover:border-cyan/70 transition-all duration-300"
            style={{ background: "rgba(0,212,255,0.04)", backdropFilter: "blur(8px)" }}
          >
            <span className="flex items-center gap-2">
              <Icon name="MessageSquare" size={14} />
              Спросить AI
            </span>
          </button>
        </div>
      </main>

      {/* Нижняя разделительная линия */}
      <div className="relative z-30 mx-8">
        <div className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)" }}
        />
      </div>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="relative z-30 overflow-hidden py-3"
        style={{
          background: "rgba(0,212,255,0.04)",
          borderTop: "1px solid rgba(0,212,255,0.18)",
          borderBottom: "1px solid rgba(0,212,255,0.18)",
        }}
      >
        <div className="marquee-track flex items-center">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-oswald font-light text-[11px] tracking-[0.35em] uppercase text-cyan/60 whitespace-nowrap px-6">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-30 flex items-center justify-between px-8 py-4">
        <div className="font-ibm text-[10px] tracking-[0.2em] uppercase text-steel/50">
          © 2025 АвтоТех
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <Icon name="Phone" size={11} className="text-cyan/40" />
            <span className="font-ibm text-[10px] text-steel/50">+7 (900) 000-00-00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="MapPin" size={11} className="text-cyan/40" />
            <span className="font-ibm text-[10px] text-steel/50">Москва</span>
          </div>
        </div>
        <div className="font-ibm text-[10px] tracking-[0.15em] text-steel/30 uppercase">
          v2.0.1 ALPHA
        </div>
      </footer>
    </div>
  );
}
