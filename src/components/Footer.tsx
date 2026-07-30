import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Twitter, Instagram, Linkedin, Globe, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();

  const scrollToTop = () => {
    playUiSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-serif font-bold text-amber-400">
                HS
              </div>
              <span className="font-serif text-xl font-bold text-neutral-100 tracking-tight">
                HABİB SAL<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-neutral-400 max-w-sm text-xs leading-relaxed">
              {language === 'tr'
                ? 'Mobil uygulama geliştirme (Python & Flutter), otonom bot sistemleri (Raspberry Pi), Active Directory / MS SQL veritabanı yönetimi ve finansal analiz panelleri tasarlayan IT uzmanı ve yazılım geliştirici.'
                : 'Software Developer & IT Specialist engineering mobile applications (Python & Flutter), 24/7 Raspberry Pi automation bots, enterprise Active Directory & MS SQL databases.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://play.google.com/store/apps/dev?id=6548416972501917823&hl=tr"
                target="_blank"
                rel="noreferrer"
                title="Google Play Store Developer Profile"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-amber-500/30 transition-colors"
              >
                <Globe className="w-4 h-4 text-amber-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/habib-s-97143150/"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/habibsal"
                target="_blank"
                rel="noreferrer"
                title="X Profile"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/hbbsal/"
                target="_blank"
                rel="noreferrer"
                title="Instagram Profile"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="http://habibsal.com.tr"
                target="_blank"
                rel="noreferrer"
                title="Official Website"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-neutral-200 text-xs uppercase tracking-wider text-amber-400">
              Navigasyon & Portfolyo
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {language === 'tr' ? 'Hakkında & Vizyon' : 'About & Vision'}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-amber-400 transition-colors">
                  {language === 'tr' ? 'İmzalı Projeler & Eserler' : 'Signature Works'}
                </a>
              </li>
              <li>
                <a href="#social-feed" className="hover:text-amber-400 transition-colors">
                  {language === 'tr' ? 'X & Instagram Akışı' : 'X & Instagram Stream'}
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-amber-400 transition-colors">
                  {language === 'tr' ? 'Düşünce Liderliği & Makaleler' : 'Executive Insights'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {language === 'tr' ? 'Stratejik İletişim & Danışmanlık' : 'Advisory Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-neutral-200 text-xs uppercase tracking-wider text-amber-400">
              İrtibat Bilgileri
            </h4>
            <p className="text-neutral-400">
              Web: habibsal.com.tr
            </p>
            <p className="text-neutral-400">
              Email: habiblas@gmail.com
            </p>
            <p className="text-neutral-400">
              Lokasyon: İstanbul / Zurich / Dubai
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Habib Sal. Tüm Hakları Saklıdır. Executive Digital Flagship.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>{language === 'tr' ? 'Yukarı Dön' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
