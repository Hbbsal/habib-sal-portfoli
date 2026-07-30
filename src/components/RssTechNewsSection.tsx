import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { Rss, RefreshCw, ExternalLink, Search, Sparkles, Newspaper, Clock, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

export interface RssNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceCategory: string;
  snippet: string;
  isoDate?: string;
}

export const RssTechNewsSection: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [news, setNews] = useState<RssNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeNewsModal, setActiveNewsModal] = useState<RssNewsItem | null>(null);

  const fetchRssNews = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
      playUiSound('click');
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch('/api/rss-news');
      const data = await response.json();
      if (data.success && Array.isArray(data.items)) {
        setNews(data.items);
        setLastUpdated(data.updatedAt ? new Date(data.updatedAt).toLocaleTimeString() : new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Failed to fetch RSS tech news:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRssNews();
    // Auto refresh every 5 minutes
    const interval = setInterval(() => {
      fetchRssNews();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const sources = [
    { id: 'all', labelTR: 'Tüm Kaynaklar', labelEN: 'All Sources' },
    { id: 'ShiftDelete', labelTR: 'ShiftDelete', labelEN: 'ShiftDelete' },
    { id: 'Webrazzi', labelTR: 'Webrazzi', labelEN: 'Webrazzi' },
    { id: 'TechCrunch', labelTR: 'TechCrunch', labelEN: 'TechCrunch' },
    { id: 'Hacker News', labelTR: 'Hacker News', labelEN: 'Hacker News' },
    { id: 'DonanımHaber', labelTR: 'DonanımHaber', labelEN: 'DonanımHaber' },
  ];

  const filteredNews = news.filter((item) => {
    const matchesSource = selectedSource === 'all' || item.source.toLowerCase().includes(selectedSource.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="rss-tech-news" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-4">
              <Rss className="w-3.5 h-3.5 animate-pulse" />
              <span>{language === 'tr' ? 'Canlı RSS Teknoloji Akışı' : 'Live RSS Tech Feed'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
              {language === 'tr' ? (
                <>
                  Canlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Teknoloji Haberleri</span>
                </>
              ) : (
                <>
                  Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Tech News Radar</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm max-w-2xl leading-relaxed">
              {language === 'tr'
                ? 'Webrazzi, ShiftDelete, TechCrunch, Hacker News ve DonanımHaber RSS akışlarından anlık çekilen güncel yazılım, mobil, otomasyon ve girişim haberleri.'
                : 'Aggregated real-time technology RSS feeds from ShiftDelete, Webrazzi, TechCrunch, Hacker News, and DonanımHaber.'}
            </p>
          </div>

          {/* Sync status & Refresh button */}
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'tr' ? `Son Güncelleme: ${lastUpdated}` : `Last Sync: ${lastUpdated}`}</span>
              </div>
            )}
            <button
              id="rss-manual-refresh-btn"
              onClick={() => fetchRssNews(true)}
              disabled={refreshing}
              onMouseEnter={() => playUiSound('hover')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? (language === 'tr' ? 'Yenileniyor...' : 'Syncing...') : (language === 'tr' ? 'Haberleri Yenile' : 'Refresh News')}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 backdrop-blur-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Source Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-neutral-500 font-mono pr-2 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400" />
              Kaynak:
            </span>
            {sources.map((src) => (
              <button
                key={src.id}
                id={`rss-source-${src.id}`}
                onClick={() => {
                  playUiSound('click');
                  setSelectedSource(src.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedSource === src.id
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {language === 'tr' ? src.labelTR : src.labelEN}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'tr' ? 'Haber ara (Flutter, AI, Pi...)' : 'Search news...'}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="h-48 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 animate-pulse p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-24 h-4 bg-neutral-800 rounded" />
                  <div className="w-full h-6 bg-neutral-800 rounded" />
                  <div className="w-3/4 h-4 bg-neutral-800/60 rounded" />
                </div>
                <div className="w-20 h-4 bg-neutral-800 rounded" />
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-16 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <Newspaper className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400 text-sm font-mono">
              {language === 'tr' ? 'Aradığınız kriterlere uygun haber bulunamadı.' : 'No news found matching your criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedSource('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline font-mono"
            >
              {language === 'tr' ? 'Filtreleri Temizle' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => {
                  playUiSound('click');
                  setActiveNewsModal(item);
                }}
                onMouseEnter={() => playUiSound('hover')}
                className="group relative rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950 text-amber-400 border border-neutral-800 group-hover:border-amber-500/30 transition-colors">
                      {item.source}
                    </span>
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-600" />
                      {formatDate(item.pubDate)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {item.snippet}
                  </p>
                </div>

                {/* Footer Link & Action */}
                <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span className="text-[11px] text-neutral-500">{item.sourceCategory || 'Teknoloji'}</span>
                  <div className="flex items-center gap-1 font-semibold text-amber-400">
                    <span>{language === 'tr' ? 'Oku' : 'Read Article'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Google Play & Developer Quick Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-neutral-100">
                {language === 'tr' ? 'Habib Sal Google Play Geliştirici Mağazası' : 'Habib Sal Google Play Store Storefront'}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                {language === 'tr'
                  ? 'Kaybeden ve Bulan, Gold Finans Master, Türk Baraj Verileri, Hediye Rehberi ve Basit Kart Eşleştirme mobil uygulamalarını Play Store üzerinden hemen indirin.'
                  : 'Explore live mobile apps developed by Habib Sal published on Google Play Console ID: 6548416972501917823.'}
              </p>
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/dev?id=6548416972501917823&hl=tr"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playUiSound('hover')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>{language === 'tr' ? 'Geliştirici Profilini Aç' : 'Open Developer Profile'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* RSS Article Preview Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-4">
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Rss className="w-4 h-4" />
              <span>{activeNewsModal.source}</span>
              <span>•</span>
              <span>{formatDate(activeNewsModal.pubDate)}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 leading-snug">
              {activeNewsModal.title}
            </h3>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
              {activeNewsModal.snippet}
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => setActiveNewsModal(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-mono font-medium hover:bg-neutral-700"
              >
                {language === 'tr' ? 'Kapat' : 'Close'}
              </button>
              <a
                href={activeNewsModal.link}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-400"
              >
                <span>{language === 'tr' ? 'Kaynağa Git (Tam Oku)' : 'Open Full Article'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
