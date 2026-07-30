import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { articlesList } from '../data/habibSalData';
import { ArticleItem } from '../types';
import { BookOpen, Clock, Calendar, ArrowUpRight, X, Sparkles } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const { language, playUiSound, articleModalItem, setArticleModalItem } = useThemeLanguage();

  return (
    <section id="articles" className="py-24 bg-neutral-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'DÜŞÜNCE LİDERLİĞİ & MAKALELER' : 'THOUGHT LEADERSHIP & INSIGHTS'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
            {language === 'tr' ? 'Makaleler & Vizyon Yazıları' : 'Articles & Executive Essays'}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm max-w-xl">
            {language === 'tr'
              ? 'Geleceğin mimarisi, yapay zekâ entegrasyonu ve melek yatırım dünyasından stratejik değerlendirmeler.'
              : 'Strategic essays exploring architectural futures, AI integration, and venture capital paradigms.'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesList.map((article) => (
            <div
              key={article.id}
              onClick={() => setArticleModalItem(article)}
              onMouseEnter={() => playUiSound('hover')}
              className="group rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.titleTR}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[11px] font-mono">
                    {language === 'tr' ? article.categoryTR : article.categoryEN}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-3 leading-snug">
                    {language === 'tr' ? article.titleTR : article.titleEN}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {language === 'tr' ? article.excerptTR : article.excerptEN}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span>{language === 'tr' ? 'Makaleyi Oku' : 'Read Essay'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Full Reader Modal */}
      {articleModalItem && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 max-w-3xl w-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
              <img
                src={articleModalItem.coverImage}
                alt="Article Cover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setArticleModalItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-950/80 text-neutral-200 hover:text-amber-400 border border-neutral-800 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3.5 py-1 rounded-full bg-neutral-950/90 border border-amber-500/40 text-amber-400 text-xs font-mono">
                  {language === 'tr' ? articleModalItem.categoryTR : articleModalItem.categoryEN}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
                <span>{articleModalItem.date}</span>
                <span>•</span>
                <span>{articleModalItem.readTime}</span>
                <span>•</span>
                <span className="text-amber-400">Habib Sal</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
                {language === 'tr' ? articleModalItem.titleTR : articleModalItem.titleEN}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-neutral-800 pt-4">
                {language === 'tr' ? articleModalItem.contentTR : articleModalItem.contentEN}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
