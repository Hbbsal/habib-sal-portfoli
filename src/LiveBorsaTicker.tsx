import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { TrendingUp, TrendingDown, RefreshCw, Activity, DollarSign, Coins } from 'lucide-react';

export interface BorsaTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  category: 'index' | 'fx' | 'commodity' | 'crypto' | 'bist_stock';
  lastUpdated: string;
}

export const LiveBorsaTicker: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [items, setItems] = useState<BorsaTickerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const fetchTickerData = async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
      playUiSound('click');
    }
    try {
      const res = await fetch('/api/borsa-ticker');
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
        setLastSync(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to fetch borsa ticker:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickerData();
    // Auto refresh every 20 seconds
    const interval = setInterval(() => {
      fetchTickerData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate items array for smooth continuous infinite marquee effect
  const marqueeItems = [...items, ...items];

  return (
    <div
      id="sticky-borsa-ticker"
      className="sticky top-[86px] sm:top-[107px] mt-[94px] sm:mt-[123px] z-40 w-full bg-neutral-950 border-y border-amber-500/20 py-2.5 shadow-lg shadow-black/50 transition-all"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-3 overflow-hidden">
        
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-mono text-amber-400 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">
            {language === 'tr' ? 'BİST & PİYASALAR CANLI' : 'BİST & LIVE MARKETS'}
          </span>
          <span className="sm:hidden">CANLI</span>
        </div>

        {/* Middle Marquee Track */}
        <div
          className="relative flex-1 overflow-hidden mask-gradient-x cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loading && items.length === 0 ? (
            <div className="flex items-center gap-6 py-1 text-xs text-neutral-400 font-mono animate-pulse">
              <span>BİST 100 Yükleniyor...</span>
              <span>USD/TRY Yükleniyor...</span>
              <span>Gram Altın Yükleniyor...</span>
              <span>THYAO Yükleniyor...</span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-6 sm:gap-8 whitespace-nowrap transition-transform duration-1000 ${
                isPaused ? '' : 'animate-marquee'
              }`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${item.symbol}-${idx}`}
                  className="inline-flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800/80 hover:border-amber-500/40 px-3 py-1 rounded-xl text-xs font-mono transition-all group shrink-0"
                >
                  <span className="font-bold text-neutral-200 group-hover:text-amber-300">
                    {item.name}
                  </span>
                  <span className="text-neutral-100 font-semibold">{item.price}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      item.isPositive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {item.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Manual Sync & Timestamp */}
        <div className="flex items-center gap-2 shrink-0 pl-2">
          {lastSync && (
            <span className="hidden lg:inline text-[11px] font-mono text-neutral-500">
              {lastSync}
            </span>
          )}
          <button
            id="ticker-manual-refresh-btn"
            onClick={() => fetchTickerData(true)}
            disabled={refreshing}
            onMouseEnter={() => playUiSound('hover')}
            title="Piyasa Verilerini Anlık Yenile"
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
