import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { ProjectItem } from '../types';
import { X, MapPin, Calendar, CheckCircle2, Sparkles, Building2, ArrowUpRight } from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { language, playUiSound, caseStudyProject, setCaseStudyProject, setAiModalOpen } = useThemeLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!caseStudyProject) return null;

  const currentImg = selectedImg || caseStudyProject.heroImage;

  const scrollToContact = () => {
    setCaseStudyProject(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-neutral-900 border border-amber-500/30 w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Top bar */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
              {language === 'tr' ? caseStudyProject.categoryLabelTR : caseStudyProject.categoryLabelEN}
            </span>
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {caseStudyProject.location}
            </span>
          </div>

          <button
            onClick={() => {
              playUiSound('click');
              setCaseStudyProject(null);
            }}
            className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Display Image */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800">
            <img
              src={currentImg}
              alt={caseStudyProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery Picker */}
          {caseStudyProject.gallery && caseStudyProject.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {caseStudyProject.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playUiSound('click');
                    setSelectedImg(imgUrl);
                  }}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    currentImg === imgUrl ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'border-neutral-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono mb-2 gap-2">
              <span>Client / Partner: {caseStudyProject.clientOrPartner || 'Habib Sal Signature'}</span>
              <span>Year: {caseStudyProject.year}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-100">
                {caseStudyProject.title}
              </h2>
              {caseStudyProject.playStoreUrl && (
                <a
                  href={caseStudyProject.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => playUiSound('hover')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-amber-500/40 text-amber-400 hover:text-amber-300 text-xs font-mono font-bold transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'tr' ? 'Google Play\'de İncele' : 'View on Google Play'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {language === 'tr' ? caseStudyProject.detailsTR : caseStudyProject.detailsEN}
            </p>
          </div>

          {/* Key Features List */}
          <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h4 className="font-serif text-sm font-bold text-neutral-100 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'tr' ? 'ÖNE ÇIKAN MİMARİ VE TEKNİK ÖZELLİKLER' : 'KEY ARCHITECTURAL & TECH SPECIFICATIONS'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === 'tr' ? caseStudyProject.keyFeaturesTR : caseStudyProject.keyFeaturesEN).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          {caseStudyProject.metrics && caseStudyProject.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {caseStudyProject.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    {language === 'tr' ? m.labelTR : m.labelEN}
                  </span>
                  <span className="font-serif text-xl font-bold text-amber-400 mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-neutral-100 text-base">
                {language === 'tr' ? 'Benzer Bir Proje veya Danışmanlık Talebiniz Var mı?' : 'Inquire About Similar Architectural or Advisory Engagements'}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Habib Sal ile doğrudan görüşme veya randevu planlayın.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer whitespace-nowrap"
            >
              {language === 'tr' ? 'İletişime Geç' : 'Book Inquiry'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
