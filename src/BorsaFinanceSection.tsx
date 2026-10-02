import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { TrendingUp, RefreshCw, ExternalLink, Search, Clock, Filter, LineChart, Building2, ShieldCheck, Newspaper, Sparkles, DollarSign, Coins } from 'lucide-react';
import { RssNewsItem } from './RssTechNewsSection';

export interface BorsaTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  category: 'index' | 'fx' | 'commodity' | 'crypto' | 'bist_stock';
  lastUpdated: string;
}

export const BorsaFinanceSection: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [news, setNews] = useState<RssNewsItem[]>([]);
  const [tickerItems, setTickerItems] = useState<BorsaTickerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<RssNewsItem | null>(null);

  const fetchFinanceData = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
      playUiSound('click');
    } else {
      setLoading(true);
    }

    try {
      const [newsRes, tickerRes] = await Promise.all([
        fetch('/api/finance-news'),
        fetch('/api/borsa-ticker')
      ]);

      const newsData = await newsRes.json();
      if (newsData.success && Array.isArray(newsData.items)) {
        setNews(newsData.items);
        setLastUpdated(newsData.updatedAt ? new Date(newsData.updatedAt).toLocaleTimeString('tr-TR') : new Date().toLocaleTimeString('tr-TR'));
      }

      const tickerData = await tickerRes.json();
      if (tickerData.success && Array.isArray(tickerData.items)) {
        setTickerItems(tickerData.items);
      }
    } catch (err) {
      console.error('Failed to fetch finance news or ticker data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
    const interval = setInterval(() => {
      fetchFinanceData();
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  const sources = [
    { id: 'all', labelTR: 'Tüm Kaynaklar', labelEN: 'All Sources' },
    { id: 'Fintables', labelTR: 'Fintables', labelEN: 'Fintables' },
    { id: 'Investing TR', labelTR: 'Investing TR', labelEN: 'Investing TR' },
    { id: 'Bloomberg HT', labelTR: 'Bloomberg HT', labelEN: 'Bloomberg HT' },
    { id: 'Borsa Gündem', labelTR: 'Borsa Gündem', labelEN: 'Borsa Gündem' },
    { id: 'Para Analiz', labelTR: 'Para Analiz', labelEN: 'Para Analiz' },
    { id: 'Dünya Gazetesi', labelTR: 'Dünya Ekonomi', labelEN: 'Dunya Economy' },
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

  // Top Key Indicators
  const keyIndicators = tickerItems.filter((i) => ['XU100.IS', 'USDTRY=X', 'EURTRY=X', 'GC=F', 'BTC-USD'].includes(i.symbol));

  return (
    <section id="borsa-finance" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-4">
              <LineChart className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{language === 'tr' ? 'Borsa İstanbul & Finans Radarı (Fintables & Investing TR)' : 'BİST & Finance Radar'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
              {language === 'tr' ? (
                <>
                  Canlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">Borsa & Ekonomi</span> Haberleri
                </>
              ) : (
                <>
                  Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">Market & Economy</span> News
                </>
              )}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm max-w-2xl leading-relaxed">
              {language === 'tr'
                ? 'Fintables, Investing Türkiye, Bloomberg HT, Borsa Gündem ve Para Analiz akışlarından anlık çekilen BIST 100 endeks gelişmeleri, bilanço analizleri, döviz, altın ve makroekonomi haberleri.'
                : 'Live aggregated financial news and stock metrics from Fintables, Investing.com TR, Bloomberg HT, Borsa Gündem, and Para Analiz.'}
            </p>
          </div>

          {/* Sync status & Refresh button */}
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'tr' ? `Son Güncelleme: ${lastUpdated}` : `Last Sync: ${lastUpdated}`}</span>
              </div>
            )}
            <button
              id="finance-manual-refresh-btn"
              onClick={() => fetchFinanceData(true)}
              disabled={refreshing}
              onMouseEnter={() => playUiSound('hover')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? (language === 'tr' ? 'Yenileniyor...' : 'Syncing...') : (language === 'tr' ? 'Piyasaları Yenile' : 'Refresh Markets')}</span>
            </button>
          </div>
        </div>

        {/* Live Market Cards Grid Banner */}
        {keyIndicators.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
            {keyIndicators.map((ind) => (
              <div
                key={ind.symbol}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span>{ind.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      ind.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {ind.change}
                  </span>
                </div>
                <div className="font-mono text-base font-bold text-neutral-100 mt-1">
                  {ind.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 backdrop-blur-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Source Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-neutral-500 font-mono pr-2 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3 text-emerald-400" />
              Kaynak:
            </span>
            {sources.map((src) => (
              <button
                key={src.id}
                id={`finance-source-${src.id.replace(/\s+/g, '-')}`}
                onClick={() => {
                  playUiSound('click');
                  setSelectedSource(src.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedSource === src.id
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
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
              placeholder={language === 'tr' ? 'Haber ara (THYAO, Bilanço, Dolar...)' : 'Search finance news...'}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Finance News Grid */}
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
              {language === 'tr' ? 'Aradığınız kriterlere uygun finans haberi bulunamadı.' : 'No financial news found matching criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedSource('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-emerald-400 hover:underline font-mono"
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
                  setActiveArticleModal(item);
                }}
                onMouseEnter={() => playUiSound('hover')}
                className="group relative rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950 text-emerald-400 border border-neutral-800 group-hover:border-emerald-500/30 transition-colors">
                      {item.source}
                    </span>
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-600" />
                      {formatDate(item.pubDate)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {item.snippet}
                  </p>
                </div>

                {/* Footer Link & Action */}
                <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-emerald-400 transition-colors">
                  <span className="text-[11px] text-neutral-500">{item.sourceCategory || 'Borsa & Finans'}</span>
                  <div className="flex items-center gap-1 font-semibold text-emerald-400">
                    <span>{language === 'tr' ? 'Habere Git' : 'Read Article'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Informational Data Source Explanation Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-neutral-100">
                {language === 'tr' ? 'Canlı Finans ve Borsa Veri Kaynakları Hakkında' : 'About Live Financial Data Sources'}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                {language === 'tr'
                  ? 'Veriler Fintables, Investing.com Türkiye, Bloomberg HT, Borsa Gündem ve Yahoo Finance altyapılarından anlık çekilir. BIST 100 ve hisse fiyatları 25-30 saniyede bir otomatik güncellenerek sayfanın üst tarafında kayan canlı bantta yayınlanmaktadır.'
                  : 'Real-time financial news and ticker data are gathered via Fintables, Investing.com TR, Bloomberg HT, and Yahoo Finance APIs with 25-30 seconds auto-sync.'}
              </p>
            </div>
          </div>
          <a
            href="https://fintables.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playUiSound('hover')}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <span>Fintables İncele</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Finance Article Preview Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-4">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <LineChart className="w-4 h-4" />
              <span>{activeArticleModal.source}</span>
              <span>•</span>
              <span>{formatDate(activeArticleModal.pubDate)}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 leading-snug">
              {activeArticleModal.title}
            </h3>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
              {activeArticleModal.snippet}
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-mono font-medium hover:bg-neutral-700"
              >
                {language === 'tr' ? 'Kapat' : 'Close'}
              </button>
              <a
                href={activeArticleModal.link}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-400"
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
