import React, { useState, useRef, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { AiChatMessage } from '../types';
import { Bot, Send, X, Sparkles, User, RefreshCw, MessageSquare, ArrowUpRight } from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const { language, playUiSound, aiModalOpen, setAiModalOpen } = useThemeLanguage();
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: language === 'tr'
        ? "Merhaba, ben Habib Sal'ın Dijital Yapay Zekâ İkiziyim. Habib Sal'ın mimari projeleri, dijital vizyonu, melek yatırımları veya stratejik danışmanlık süreçleri hakkında bana dilediğiniz soruyu sorabilirsiniz."
        : "Hello, I am Habib Sal's Executive Digital AI Twin. Feel free to ask me anything about Habib Sal's architectural portfolio, digital vision, angel investments, or strategic advisory processes.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQueriesTR = [
    "Habib Sal'ın mimari ve tasarım felsefesi nedir?",
    "Hangi sektörlerde melek yatırımcılık yapıyor?",
    "Stratejik danışmanlık veya proje teklifi nasıl iletilir?",
    "Zürih ve Boğaz projeleri hakkında bilgi verir misin?"
  ];

  const suggestedQueriesEN = [
    "What is Habib Sal's architectural philosophy?",
    "Which sectors does he back as an angel investor?",
    "How can I request board advisory or pitch a project?",
    "Tell me about the Zurich and Bosphorus projects."
  ];

  const suggestions = language === 'tr' ? suggestedQueriesTR : suggestedQueriesEN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!aiModalOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    playUiSound('click');
    const userMsg: AiChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply: AiChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: data.text || "Özür dilerim, şu an yanıt üretilemedi.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error("API error");
      }
    } catch (e) {
      const errorReply: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: language === 'tr'
          ? "Habib Sal AI şu an yoğunluk nedeniyle yanıt veremiyor. Sorunuzu doğrudan habiblas@gmail.com adresine veya iletişim formumuzdan iletebilirsiniz."
          : "Habib Sal AI is temporarily busy. You can send your inquiry directly to habiblas@gmail.com or via our advisory form.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-neutral-900 border border-amber-500/30 w-full max-w-3xl h-[88vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[15px] flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-neutral-100 text-base">Habib Sal AI</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono uppercase">
                  Gemini 3.6 Flash
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {language === 'tr' ? 'Habib Sal Resmi Dijital İkizi & Danışman Asistanı' : 'Official Digital Twin & Advisory Assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiSound('click');
              setAiModalOpen(false);
            }}
            className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-neutral-900/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs ${
                  msg.role === 'user'
                    ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                    : 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-none'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mr-auto items-center text-amber-400 text-xs font-mono">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-2xl border border-neutral-800">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{language === 'tr' ? 'Habib Sal AI düşünüyor...' : 'Habib Sal AI is generating response...'}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chip Queries */}
        <div className="px-4 py-3 bg-neutral-950/80 border-t border-neutral-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[10px] text-neutral-400 font-mono uppercase mr-1">Öneriler:</span>
            {suggestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs transition-all cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'tr'
                  ? 'Habib Sal hakkında bir soru sorun (Mimari, AI, Yatırım)...'
                  : 'Ask Habib Sal AI (Architecture, AI, Investment)...'
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 placeholder-neutral-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
