import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Bot, Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, soundEnabled, setSoundEnabled, playUiSound, setAiModalOpen } = useThemeLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', labelTR: 'Hakkında & Vizyon', labelEN: 'About & Vision' },
    { id: 'portfolio', labelTR: 'Projeler & Eserler', labelEN: 'Projects & Works' },
    { id: 'rss-tech-news', labelTR: 'Canlı Teknoloji (RSS)', labelEN: 'Live Tech RSS' },
    { id: 'social-feed', labelTR: 'X & Instagram Feed', labelEN: 'Social Hub' },
    { id: 'articles', labelTR: 'Düşünce Liderliği', labelEN: 'Insights' },
    { id: 'contact', labelTR: 'İletişim & Danışmanlık', labelEN: 'Contact & Advisory' },
  ];

  const scrollToSection = (id: string) => {
    playUiSound('click');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg bg-neutral-950/80 dark:bg-neutral-950/85 backdrop-blur-xl border-b border-amber-500/10 shadow-2xl shadow-black/40'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => playUiSound('hover')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center font-serif font-bold text-lg text-amber-400 tracking-wider">
                HS
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
                HABİB SAL<span className="text-amber-500">.</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-amber-400/70 font-mono">
                Executive & Architect
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => playUiSound('hover')}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-amber-400 rounded-full transition-all hover:bg-neutral-800/50 cursor-pointer"
              >
                {language === 'tr' ? link.labelTR : link.labelEN}
              </button>
            ))}
          </nav>

          {/* Action Buttons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Twin Assistant Trigger */}
            <button
              id="ai-twin-trigger-btn"
              onClick={() => setAiModalOpen(true)}
              onMouseEnter={() => playUiSound('hover')}
              className="relative group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-neutral-900 to-amber-500/10 border border-amber-500/30 hover:border-amber-400/80 text-amber-300 hover:text-amber-200 text-xs font-medium transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ask Habib Sal AI</span>
              <span className="sm:hidden">AI</span>
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-0.5 text-xs font-medium">
              <button
                id="lang-tr-btn"
                onClick={() => setLanguage('tr')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'tr'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                TR
              </button>
              <button
                id="lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              onMouseEnter={() => playUiSound('hover')}
              title={theme === 'obsidian' ? 'Switch to Light Pearl Mode' : 'Switch to Dark Obsidian Mode'}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-all cursor-pointer"
            >
              {theme === 'obsidian' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-200" />}
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={() => {
                playUiSound('click');
                setSoundEnabled(!soundEnabled);
              }}
              onMouseEnter={() => playUiSound('hover')}
              title={soundEnabled ? 'Mute UI audio' : 'Enable UI audio'}
              className="hidden sm:flex p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
            </button>

            {/* VIP Advisory CTA button */}
            <button
              id="vip-advisory-cta"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => playUiSound('hover')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{language === 'tr' ? 'Danışmanlık Al' : 'Book Advisory'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                playUiSound('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-amber-500/20 px-6 py-6 mt-3 shadow-2xl transition-all animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left py-2.5 text-sm font-medium text-neutral-200 hover:text-amber-400 border-b border-neutral-800/50 flex items-center justify-between"
              >
                <span>{language === 'tr' ? link.labelTR : link.labelEN}</span>
                <ArrowUpRight className="w-4 h-4 text-amber-500/60" />
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAiModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                Ask Habib Sal AI
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 rounded-xl bg-amber-500 text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2"
              >
                {language === 'tr' ? 'Danışmanlık Talebi Oluştur' : 'Request Executive Advisory'}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
