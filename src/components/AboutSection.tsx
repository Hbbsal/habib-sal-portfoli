import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { habibSalProfile, philosophyPillars, timelineMilestones } from '../data/habibSalData';
import { Smartphone, Compass, Cpu, TrendingUp, Sparkles, CheckCircle2, Award, Building2, ChevronRight, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState<'mobile' | 'tech' | 'venture'>('mobile');
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      default: return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'HAKKINDA & VİZYON' : 'ABOUT & VISION'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight max-w-3xl">
            {language === 'tr' 
              ? 'Tasarım, Teknoloji ve Stratejinin Kesişim Noktası' 
              : 'The Convergence of Design, Technology & Strategy'}
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-sm sm:text-base">
            {language === 'tr'
              ? 'Habib Sal; mobil uygulama geliştirme (Python, Flutter), otonom bot altyapıları (Raspberry Pi), kurumsal veritabanı yönetimi (Active Directory, MS SQL) ve finansal analiz panelleri geliştirmektedir.'
              : 'Habib Sal engineers mobile applications (Python, Flutter), autonomous 24/7 Raspberry Pi bots, enterprise IT infrastructures (Active Directory, MS SQL), and financial analytics dashboards.'}
          </p>
        </div>

        {/* Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {philosophyPillars.map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => playUiSound('hover')}
              className="group p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-2">
                  {language === 'tr' ? pillar.titleTR : pillar.titleEN}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {language === 'tr' ? pillar.descTR : pillar.descEN}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-amber-500/80">
                <span>HABİB SAL PILLAR</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Focus Area Tabs & Spotlight */}
        <div className="bg-neutral-900/60 rounded-3xl border border-neutral-800 p-6 sm:p-10 mb-20 backdrop-blur-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-neutral-100">
                {language === 'tr' ? 'Uzmanlık & Etki Alanları' : 'Areas of Expertise & Impact'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {language === 'tr' ? 'Habib Sal’ın disiplinler arası çalışma modelleri' : 'Interdisciplinary operating models of Habib Sal'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-2xl border border-neutral-800">
              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveTab('mobile');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'mobile'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {language === 'tr' ? 'Mobil Uygulama Mimarisi' : 'Mobile App Architecture'}
              </button>
              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveTab('tech');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'tech'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {language === 'tr' ? 'Teknoloji & AI' : 'Technology & AI'}
              </button>
              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveTab('venture');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'venture'
                    ? 'bg-amber-500 text-neutral-950 shadow-lg'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {language === 'tr' ? 'Melek Yatırım & Scaling' : 'Venture & Scaling'}
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'mobile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">01. MOBILE APP ENGINEERING</span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
                  {language === 'tr' ? 'iOS & Android Mobil Uygulama Mimarisi ve On-Device AI' : 'iOS & Android Mobile App Architecture & On-Device AI'}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {language === 'tr'
                    ? 'Mobil uygulama tasarımı, sadece güzel ekranlar çizmek değil; yüksek veri trafiğini sıfır kasma ile işleyen, pil optimizasyonuna sahip ve cihaz üzerinde yapay zekâ (On-Device AI) modelleri çalıştıran ürünler inşa etmektir. Habib Sal, mobil yazılım ekosisteminde native ve modern hibrit mimarilere liderlik eder.'
                    : 'Mobile software design is architecting ultra-responsive engines handling heavy workloads with zero lag, optimized battery efficiency, and on-device AI integration. Habib Sal leads cutting-edge native and hybrid mobile app engineering across global App Stores.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'iOS & Android Native Mühendislik' : 'iOS & Android Native Engineering'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Cihaz Üzerinde Çalışan Yapay Zekâ (On-Device AI)' : 'On-Device AI Model Execution'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? '60 FPS Akıcı Mobil UI / UX Tasarımı' : '60 FPS Fluid Mobile UI / UX Systems'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Mobil IoT ve Akıllı Ekosistem Yönetimi' : 'Mobile IoT & Smart Ecosystem Control'}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt="Mobile App Architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">02. DIGITAL & AI LEADERSHIP</span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
                  {language === 'tr' ? 'Veri Odaklı Karar Sistemleri ve AI Mimarisi' : 'Data-Driven Decision Engines & AI Architecture'}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {language === 'tr'
                    ? 'Yapay zekâ ve büyük veri analitiği, modern iş dünyasında sürdürülebilir rekabet avantajının temelidir. Habib Sal, şirketlerin dijital altyapılarını yenilerken generative AI modelleri, bulut sistemleri ve kullanıcı deneyimi odaklı arayüzler kurgular.'
                    : 'AI and big data analytics form the cornerstone of sustainable competitive moats. Habib Sal architects digital enterprise foundations integrating generative AI models, cloud infrastructures, and high-impact UX.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Generative AI & LLM Entegrasyonları' : 'Generative AI & LLM Integrations'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Dijital Dönüşüm Strateji Haritaları' : 'Digital Transformation Strategy Roadmaps'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'PropTech & Yapı Teknolojileri' : 'PropTech & Building Tech Solutions'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Üst Düzey Kullanıcı Deneyimi (UX)' : 'Executive Digital UX Systems'}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt="Technology AI"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          )}

          {activeTab === 'venture' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">03. VENTURE CAPITAL & BOARD ADVISORY</span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
                  {language === 'tr' ? 'Melek Yatırım ve Yönetim Kurulu Danışmanlığı' : 'Angel Investment & Board Strategic Advisory'}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {language === 'tr'
                    ? 'Yenilikçi girişimleri doğru sermaye, uluslararası iş ağları ve stratejik vizyonla buluşturuyoruz. Teknoloji, gayrimenkul ve tasarım odaklı şirketlere yönetim kurulu düzeyinde rehberlik sunuyoruz.'
                    : 'Connecting breakthrough ventures with strategic capital, international networks, and executive vision. Providing board-level guidance across tech, real estate, and design ecosystems.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Erken Aşama Erken Tohum Yatırımları' : 'Seed & Early-Stage Venture Capital'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Yönetim Kurulu Üyeliği & Mentörlük' : 'Board Directorship & Mentorship'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Küresel Pazar Açılım Stratejileri' : 'Global Market Expansion Scaling'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300">{language === 'tr' ? 'Stratejik Birliktelikler & Ortaklıklar' : 'Strategic Alliance Architecture'}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
                  alt="Venture Investment"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          )}

        </div>

        {/* Timeline Milestones (Kariyer Yolculuğu) */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
              {language === 'tr' ? 'Kariyer ve Vizyon Yolculuğu' : 'Milestones & Strategic Journey'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {language === 'tr' ? 'Yıllara göre dönüm noktaları ve stratejik atılımlar' : 'Key breakthroughs and international evolution'}
            </p>
          </div>

          <div className="relative border-l border-amber-500/30 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
            {timelineMilestones.map((milestone, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playUiSound('click');
                  setSelectedMilestone(idx);
                }}
                className={`relative group cursor-pointer transition-all p-5 rounded-2xl border ${
                  selectedMilestone === idx
                    ? 'bg-neutral-900 border-amber-500/60 shadow-xl shadow-amber-500/5'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedMilestone === idx
                      ? 'bg-amber-500 border-neutral-950 scale-125'
                      : 'bg-neutral-950 border-amber-500/50 group-hover:border-amber-400'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                </div>

                {/* Year Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {milestone.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
                    {language === 'tr' ? milestone.categoryTR : milestone.categoryEN}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-neutral-100 mb-1">
                  {language === 'tr' ? milestone.titleTR : milestone.titleEN}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {language === 'tr' ? milestone.descTR : milestone.descEN}
                </p>

                {milestone.location && (
                  <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center gap-1.5 text-[11px] text-amber-500/90 font-mono">
                    <Building2 className="w-3 h-3" />
                    <span>{milestone.location}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
