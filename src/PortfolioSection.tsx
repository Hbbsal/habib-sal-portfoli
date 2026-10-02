import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { projectPortfolio } from '../data/habibSalData';
import { ProjectItem } from '../types';
import { LayoutGrid, Layers, MapPin, Calendar, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { language, playUiSound, setCaseStudyProject } = useThemeLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all'
    ? projectPortfolio
    : projectPortfolio.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-neutral-900/50 relative overflow-hidden border-y border-neutral-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'PORTFOLYO & İMZALI ESERLER' : 'PORTFOLIO & SIGNATURE WORKS'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
              {language === 'tr' ? 'Seçkin Projeler ve Eserler' : 'Flagship Projects & Works'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
            <button
              onClick={() => {
                playUiSound('click');
                setFilter('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {language === 'tr' ? 'Tümü' : 'All Works'}
            </button>
            <button
              onClick={() => {
                playUiSound('click');
                setFilter('architecture');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'architecture'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {language === 'tr' ? 'Mimari' : 'Architecture'}
            </button>
            <button
              onClick={() => {
                playUiSound('click');
                setFilter('tech');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'tech'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {language === 'tr' ? 'Teknoloji & AI' : 'Tech & AI'}
            </button>
            <button
              onClick={() => {
                playUiSound('click');
                setFilter('venture');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'venture'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {language === 'tr' ? 'Yatırım' : 'Ventures'}
            </button>
          </div>
        </div>

        {/* Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setCaseStudyProject(project)}
              onMouseEnter={() => playUiSound('hover')}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                {/* Top Tags */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-mono">
                    {language === 'tr' ? project.categoryLabelTR : project.categoryLabelEN}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 text-xs font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {project.location}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-neutral-950 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Signature Work</span>
                  </div>
                )}
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-neutral-900/90">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                    <span>{project.clientOrPartner || 'Habib Sal Signature'}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {language === 'tr' ? project.summaryTR : project.summaryEN}
                  </p>
                </div>

                {/* Metrics Pill row */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] uppercase font-mono text-neutral-400">
                            {language === 'tr' ? m.labelTR : m.labelEN}
                          </span>
                          <span className="text-xs font-bold text-amber-400 font-serif">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>{language === 'tr' ? 'Detayları İncele' : 'View Case Study'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
