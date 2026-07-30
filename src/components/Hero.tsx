import React, { useEffect, useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { habibSalProfile } from '../data/habibSalData';
import { Bot, ArrowRight, Sparkles, MapPin, Globe, Twitter, Instagram, Linkedin, Award, Layers, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, playUiSound, setAiModalOpen } = useThemeLanguage();
  const [typedIndex, setTypedIndex] = useState(0);

  const titles = language === 'tr' 
    ? ["Mobil Uygulama Mimarisi & Mühendisliği", "Stratejik Yapay Zekâ & Dijital İnovasyon", "Girişimcilik & Melek Yatırımcılık"]
    : ["Mobile Application Architecture & Engineering", "Strategic AI & Digital Innovation", "Venture Capital & Angel Investment"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollTo = (id: string) => {
    playUiSound('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute inset-0 bg-neutral-950 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Statements */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs font-medium shadow-xl shadow-amber-500/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-neutral-300">
                {language === 'tr' ? 'İstanbul / Global' : 'Istanbul / Global'}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-amber-400 font-semibold">
                {language === 'tr' ? 'Stratejik Danışmanlık & Yönetim Kurulu Rolleri' : 'Strategic Advisory & Board Roles'}
              </span>
            </div>

            {/* Main Name & Title Statement */}
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-100 leading-[1.08]">
                Habib Sal<span className="text-amber-500">.</span>
              </h1>
              <div className="h-16 sm:h-20 flex items-center mt-2">
                <p className="text-lg sm:text-2xl font-sans font-light text-amber-400/90 tracking-wide transition-all duration-500 ease-in-out">
                  {titles[typedIndex]}
                </p>
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-neutral-300/90 max-w-2xl font-sans font-normal leading-relaxed">
              {language === 'tr' ? habibSalProfile.bioTR : habibSalProfile.bioEN}
            </p>

            {/* Social Accounts Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={habibSalProfile.googlePlayDevUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playUiSound('hover')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 text-neutral-200 hover:text-amber-400 text-xs font-mono font-medium transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Play Store (Developer)</span>
              </a>
              <a
                href={habibSalProfile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playUiSound('hover')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-medium transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-amber-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/habibsal"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playUiSound('hover')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-medium transition-all"
              >
                <Twitter className="w-3.5 h-3.5 text-amber-400" />
                <span>X (@habibsal)</span>
              </a>
              <a
                href="https://www.instagram.com/hbbsal/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playUiSound('hover')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-medium transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-amber-400" />
                <span>Instagram (@hbbsal)</span>
              </a>
            </div>

            {/* CTA Action Cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-ai-chat-btn"
                onClick={() => setAiModalOpen(true)}
                onMouseEnter={() => playUiSound('hover')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-semibold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-neutral-950 group-hover:rotate-12 transition-transform" />
                <span>{language === 'tr' ? 'Yapay Zekâ Asistanı ile Konuş' : 'Talk with AI Assistant'}</span>
                <Sparkles className="w-3.5 h-3.5 text-neutral-950 animate-pulse" />
              </button>

              <button
                id="hero-social-feed-btn"
                onClick={() => scrollTo('social-feed')}
                onMouseEnter={() => playUiSound('hover')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:text-amber-400 font-medium text-sm transition-all cursor-pointer"
              >
                <span>{language === 'tr' ? 'X & Instagram Akışı' : 'X & Instagram Hub'}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Quick Fast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-neutral-800/80">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">16+</span>
                <span className="text-xs text-neutral-400 font-sans">{language === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">48+</span>
                <span className="text-xs text-neutral-400 font-sans">{language === 'tr' ? 'Tamamlanan Proje' : 'Completed Projects'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">$12M+</span>
                <span className="text-xs text-neutral-400 font-sans">{language === 'tr' ? 'Melek Yatırım' : 'Venture Capital'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400">2.4M+</span>
                <span className="text-xs text-neutral-400 font-sans">{language === 'tr' ? 'Aylık Erişim' : 'Monthly Reach'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Fashion Generated Hero Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-md lg:max-w-none group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-amber-400/10 to-amber-700/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/90 shadow-2xl">
                <img
                  src="/src/assets/images/habib_sal_hero_1785409867002.jpg"
                  alt="Habib Sal Executive Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[540px] object-cover object-center filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Floating Glass Specs Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-100 font-serif">Habib Sal</h4>
                      <p className="text-xs text-amber-400/90">habibsal.com.tr</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Location</span>
                    <span className="text-xs font-semibold text-neutral-200">İstanbul / Zurich</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
