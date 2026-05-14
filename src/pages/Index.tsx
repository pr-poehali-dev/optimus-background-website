import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const MARQUEE_TEXT =
  "ДОБРО ПОЖАЛОВАТЬ В САМОЕ СЕРДЦЕ НАШЕГО ТЕХЦЕНТРА ПОД УПРАВЛЕНИЕМ ИСКУССТВЕННОГО ИНТЕЛЛЕКТА  ✦  ";

const AI_GREETING = "Здравствуйте. Я — AI-система управления техцентром. Готов помочь вам с диагностикой и записью на обслуживание.";

const IMG_ROBOT = "https://cdn.poehali.dev/projects/5dbf1b72-d5f2-481d-9dae-482b14f265ad/files/ff11a6cd-48d4-4a01-9c99-341012abc401.jpg";
const IMG_TRUCK = "https://cdn.poehali.dev/projects/5dbf1b72-d5f2-481d-9dae-482b14f265ad/files/a7f05160-94ec-4f0a-bc40-110bf9b7e8ea.jpg";
const AI_URL = "https://functions.poehali.dev/47e2ac7e-1eb3-4e41-bed2-87483e369c34";

type TransformState = "robot" | "transforming" | "truck";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export default function Index() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [transformState, setTransformState] = useState<TransformState>("robot");
  const [hint, setHint] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text }]);
    setChatLoading(true);
    try {
      const res = await fetch(AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "ai", text: data.reply || "Ошибка ответа" }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "ai", text: "Не удалось подключиться к AI. Попробуйте позже." }]);
    }
    setChatLoading(false);
  };

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

  const handleTransform = () => {
    if (transformState !== "robot") return;
    setHint(false);
    setTransformState("transforming");
    setTimeout(() => {
      setTransformState("truck");
    }, 2200);
  };

  const isTruck = transformState === "truck";
  const isTransforming = transformState === "transforming";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a0f]">

      {/* Фон — робот */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-[2000ms]"
        style={{
          backgroundImage: `url(${IMG_ROBOT})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          opacity: isTruck ? 0 : 1,
        }}
      />

      {/* Фон — машина */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-[2000ms]"
        style={{
          backgroundImage: `url(${IMG_TRUCK})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          opacity: isTruck ? 1 : 0,
        }}
      />

      {/* Вспышка трансформации */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background: "radial-gradient(ellipse at center, rgba(0,212,255,0.95) 0%, rgba(0,100,200,0.5) 40%, transparent 70%)",
          opacity: isTransforming ? 1 : 0,
          transition: isTransforming ? "opacity 0.15s ease-in" : "opacity 1.5s ease-out",
        }}
      />

      {/* Туман */}
      <div className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,12,25,0.98) 0%, transparent 70%),
            linear-gradient(to top, rgba(6,10,15,0.97) 0%, rgba(6,10,15,0.7) 30%, rgba(6,10,15,0.15) 60%, rgba(6,10,15,0.05) 100%),
            linear-gradient(to bottom, rgba(6,10,15,0.75) 0%, rgba(6,10,15,0.05) 15%, transparent 30%)
          `
        }}
      />

      {/* Металлическая сетка */}
      <div className="absolute inset-0 z-10 metal-grid opacity-60" />

      {/* Сканирующая линия */}
      <div className="absolute inset-0 z-10 scan-overlay overflow-hidden" />

      {/* Боковые линии */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-px z-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4), transparent)" }} />

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
            <div className="font-oswald font-semibold text-white tracking-[0.12em] text-sm uppercase leading-tight">
              Авто Тех Центр
            </div>
            <div className="font-oswald text-cyan text-[11px] tracking-[0.25em] uppercase leading-tight">
              Люблино
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 animate-fade-up">
          {["Услуги", "Диагностика", "О нас"].map((item) => (
            <button key={item}
              className="font-ibm text-xs tracking-[0.2em] uppercase text-steel hover:text-cyan transition-colors duration-300">
              {item}
            </button>
          ))}
          <a
            href="https://yandex.ru/maps/?rtext=~55.676506,37.763000&rtt=auto"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ibm text-xs tracking-[0.2em] uppercase text-steel hover:text-cyan transition-colors duration-300"
          >
            Контакты
          </a>
        </nav>

        <div className="flex items-center gap-2 animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-cyan glow-cyan" />
          <span className="font-ibm text-[10px] tracking-[0.25em] uppercase text-steel">AI Online</span>
        </div>
      </header>

      {/* Линия под хедером */}
      <div className="relative z-30 mx-8">
        <div className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)" }} />
      </div>

      {/* HERO */}
      <main className="relative z-30 flex flex-col items-center justify-center min-h-[72vh] px-6 text-center">

        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-cyan opacity-40 animate-fade-up" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-cyan opacity-40 animate-fade-up" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-cyan opacity-40 animate-fade-up-delay3" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-cyan opacity-40 animate-fade-up-delay3" />

        {/* Метка */}
        <div className="animate-fade-up mb-5">
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
          className="font-oswald font-bold uppercase leading-none text-flicker animate-fade-up-delay mb-1"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
            color: "#ffffff",
            letterSpacing: "0.05em",
            textShadow: "0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1)",
          }}
        >
          Авто Тех Центр
        </h1>

        <h2
          className="font-oswald font-semibold uppercase animate-fade-up-delay mb-2"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 3.5rem)",
            color: "#00d4ff",
            letterSpacing: "0.25em",
            textShadow: "0 0 30px rgba(0,212,255,0.6)",
          }}
        >
          Люблино
        </h2>

        <p className="font-oswald font-light uppercase animate-fade-up-delay mb-7"
          style={{
            fontSize: "clamp(0.7rem, 1.8vw, 1.1rem)",
            color: "rgba(0,212,255,0.6)",
            letterSpacing: "0.28em",
          }}>
          под управлением искусственного интеллекта
        </p>

        {/* AI Чат-панель */}
        <div className="animate-fade-up-delay2 w-full max-w-xl mb-7">
          <div className="relative border-glow px-6 py-5 text-left"
            style={{ background: "rgba(0,12,25,0.78)", backdropFilter: "blur(14px)" }}>
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
        <div className="flex flex-wrap gap-4 mb-7 animate-fade-up-delay3 justify-center">
          <button
            className="font-oswald font-medium uppercase tracking-[0.2em] text-sm px-8 py-3 text-[#060a0f] transition-all duration-300"
            style={{ background: "#00d4ff", boxShadow: "0 0 24px rgba(0,212,255,0.45)" }}>
            <span className="flex items-center gap-2">
              <Icon name="Zap" size={14} />
              Записаться
            </span>
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="font-oswald font-light uppercase tracking-[0.2em] text-sm px-8 py-3 text-cyan border border-cyan/30 hover:border-cyan/70 transition-all duration-300"
            style={{ background: "rgba(0,212,255,0.04)", backdropFilter: "blur(8px)" }}>
            <span className="flex items-center gap-2">
              <Icon name="MessageSquare" size={14} />
              Спросить AI
            </span>
          </button>
        </div>

        {/* КНОПКА ТРАНСФОРМАЦИИ */}
        {transformState === "robot" && (
          <div className="animate-fade-up-delay3 flex flex-col items-center gap-2">
            <button
              onClick={handleTransform}
              className="group relative font-oswald font-semibold uppercase tracking-[0.25em] text-xs px-7 py-3 border-2 transition-all duration-300 overflow-hidden hover:scale-105"
              style={{
                borderColor: "rgba(0,212,255,0.6)",
                background: "rgba(0,212,255,0.07)",
                color: "#00d4ff",
                backdropFilter: "blur(8px)",
                boxShadow: "0 0 24px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.06)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon name="RefreshCw" size={13} />
                Трансформировать
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,212,255,0.14)" }} />
            </button>
            {hint && (
              <p className="font-ibm text-[10px] tracking-[0.2em] text-steel/50 uppercase animate-pulse">
                нажми, чтобы собрать машину
              </p>
            )}
          </div>
        )}

        {/* Статус трансформации */}
        {isTransforming && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 px-6 py-3 border-glow"
              style={{ background: "rgba(0,212,255,0.08)" }}>
              <div className="w-3 h-3 rounded-full bg-cyan glow-cyan" />
              <span className="font-oswald uppercase tracking-[0.3em] text-sm text-cyan">
                Трансформация...
              </span>
              <div className="flex gap-1 items-end">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 bg-cyan/70 animate-pulse"
                    style={{
                      height: `${12 + i * 4}px`,
                      animationDelay: `${i * 0.15}s`,
                      borderRadius: "2px",
                    }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Финал — машина готова */}
        {isTruck && (
          <div className="flex flex-col items-center gap-3 animate-fade-up">
            <div className="flex items-center gap-2 px-5 py-2.5 border-glow"
              style={{ background: "rgba(0,212,255,0.06)" }}>
              <Icon name="CheckCircle" size={14} className="text-cyan" />
              <span className="font-oswald uppercase tracking-[0.25em] text-xs text-cyan">
                Трансформация завершена
              </span>
            </div>
            <button
              onClick={() => { setTransformState("transforming"); setTimeout(() => setTransformState("robot"), 2200); setHint(false); }}
              className="group font-oswald font-light uppercase tracking-[0.25em] text-[11px] px-5 py-2 border transition-all duration-300"
              style={{
                borderColor: "rgba(143,163,177,0.3)",
                background: "rgba(143,163,177,0.04)",
                color: "rgba(143,163,177,0.7)",
              }}
            >
              <span className="flex items-center gap-2 group-hover:text-cyan transition-colors duration-300">
                <Icon name="RotateCcw" size={11} />
                Вернуть робота
              </span>
            </button>
          </div>
        )}
      </main>

      {/* Нижняя линия */}
      <div className="relative z-30 mx-8">
        <div className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)" }} />
      </div>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="relative z-30 overflow-hidden py-3"
        style={{
          background: "rgba(0,212,255,0.04)",
          borderTop: "1px solid rgba(0,212,255,0.18)",
          borderBottom: "1px solid rgba(0,212,255,0.18)",
        }}>
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
          © 2025 Авто Тех Центр Люблино
        </div>
        <div className="flex items-center gap-5">
          <a href="tel:+79037297020" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Icon name="Phone" size={11} className="text-cyan/40" />
            <span className="font-ibm text-[10px] text-steel/50">8 (903) 729-70-20</span>
          </a>
          <a
            href="https://yandex.ru/maps/?rtext=~55.676506,37.763000&rtt=auto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Icon name="MapPin" size={11} className="text-cyan/40" />
            <span className="font-ibm text-[10px] text-steel/50">Люблинская ул., дом 60</span>
          </a>
        </div>
        <div className="font-ibm text-[10px] tracking-[0.15em] text-steel/30 uppercase">
          v2.0.1 ALPHA
        </div>
      </footer>

      {/* AI ЧАТ ОКНО */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8 pointer-events-none">
          <div
            className="pointer-events-auto w-full max-w-md flex flex-col border-glow animate-fade-up"
            style={{
              background: "rgba(4,9,16,0.96)",
              backdropFilter: "blur(20px)",
              maxHeight: "70vh",
            }}
          >
            {/* Шапка чата */}
            <div className="flex items-center gap-3 px-5 py-3"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="w-7 h-7 border-glow flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.1)" }}>
                <Icon name="Bot" size={14} className="text-cyan" />
              </div>
              <div>
                <div className="font-oswald text-xs tracking-[0.2em] uppercase text-white">AI Ассистент</div>
                <div className="font-ibm text-[9px] text-steel/60 tracking-widest uppercase">только авто темы</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan glow-cyan" />
                <button onClick={() => setChatOpen(false)}
                  className="text-steel/50 hover:text-cyan transition-colors ml-2">
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-[200px]">
              {chatMessages.length === 0 && (
                <div className="text-center mt-4">
                  <p className="font-ibm text-xs text-steel/50 leading-relaxed">
                    Спросите про диагностику, ремонт,<br />замену масла, шиномонтаж или запись
                  </p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="font-ibm text-sm leading-relaxed px-4 py-2.5 max-w-[85%]"
                    style={msg.role === "user"
                      ? { background: "rgba(0,212,255,0.15)", color: "#ffffff", border: "1px solid rgba(0,212,255,0.3)" }
                      : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 flex items-center gap-1.5"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Поле ввода */}
            <div className="px-4 py-3 flex gap-2"
              style={{ borderTop: "1px solid rgba(0,212,255,0.15)" }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Спросите про авто..."
                className="flex-1 bg-transparent font-ibm text-sm text-white placeholder-steel/40 outline-none px-3 py-2 border border-cyan/20 focus:border-cyan/50 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading || !chatInput.trim()}
                className="px-4 py-2 font-oswald text-xs uppercase tracking-widest text-[#060a0f] disabled:opacity-40 transition-opacity"
                style={{ background: "#00d4ff" }}
              >
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}