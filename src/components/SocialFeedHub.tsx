import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { TweetPost, InstagramPost } from '../types';
import { Twitter, Instagram, Heart, MessageCircle, Repeat2, Share2, CheckCircle2, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

export const SocialFeedHub: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [activeTab, setActiveTab] = useState<'x' | 'instagram'>('x');
  const [feedData, setFeedData] = useState<{
    xPosts: TweetPost[];
    instagramPosts: InstagramPost[];
    xStats: { followers: string; impressions: string; verified: boolean };
    instagramStats: { followers: string; posts: string; engagement: string };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIgPost, setSelectedIgPost] = useState<InstagramPost | null>(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/social-feed');
      if (res.ok) {
        const data = await res.json();
        setFeedData(data);
      }
    } catch (e) {
      console.error("Social feed fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="social-feed" className="py-24 bg-neutral-950 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'CANLI SOSYAL MEDYA HUB’I' : 'LIVE SOCIAL MEDIA HUB'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
              {language === 'tr' ? 'X & Instagram Akışı' : 'X & Instagram Live Stream'}
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-xl">
              {language === 'tr'
                ? 'Habib Sal’ın @habibsal resmi X ve @hbbsal Instagram hesaplarından anlık düşünce paylaşımları, yazılım & bot otomasyonları ve mobil ürün güncellemeleri.'
                : 'Real-time thoughts, mobile app architectures, and automation updates directly from Habib Sal\'s official @habibsal X and @hbbsal Instagram handles.'}
            </p>
          </div>

          {/* Tab Switcher & Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-1 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveTab('x');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'x'
                    ? 'bg-amber-500 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Twitter className="w-4 h-4" />
                <span>X (@habibsal)</span>
              </button>

              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveTab('instagram');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'instagram'
                    ? 'bg-amber-500 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram (@hbbsal)</span>
              </button>
            </div>

            <button
              onClick={() => {
                playUiSound('click');
                fetchFeed();
              }}
              title="Refresh Social Feed"
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stories Preview Bar (Instagram Highlights Style) */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-6 min-w-max">
            {[
              { title: "Zürich Lab", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80" },
              { title: "Vision 2026", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80" },
              { title: "Bosphorus", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80" },
              { title: "Dubai Hub", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80" },
              { title: "AI Design", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80" }
            ].map((story, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => playUiSound('click')}>
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-700 group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/10">
                  <img
                    src={story.img}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full border-2 border-neutral-950"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-300 group-hover:text-amber-400 transition-colors">
                  {story.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Contents */}
        {activeTab === 'x' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {feedData?.xPosts.map((tweet) => (
              <div
                key={tweet.id}
                onMouseEnter={() => playUiSound('hover')}
                className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400 font-serif">
                        HS
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-neutral-100 text-sm font-serif">{tweet.author}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">{tweet.handle} • {tweet.date}</span>
                      </div>
                    </div>
                    <Twitter className="w-4 h-4 text-amber-400/80" />
                  </div>

                  {/* Content */}
                  <p className="text-sm text-neutral-200 leading-relaxed font-sans mb-4">
                    {tweet.content}
                  </p>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer">
                      <Heart className="w-3.5 h-3.5 text-amber-500/80" />
                      {tweet.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer">
                      <Repeat2 className="w-3.5 h-3.5 text-amber-500/80" />
                      {tweet.retweets}
                    </span>
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer">
                      <MessageCircle className="w-3.5 h-3.5 text-amber-500/80" />
                      {tweet.replies}
                    </span>
                  </div>
                  <span className="text-[10px] bg-neutral-950 px-2 py-0.5 rounded text-amber-400 border border-neutral-800">
                    {tweet.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'instagram' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {feedData?.instagramPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedIgPost(post)}
                onMouseEnter={() => playUiSound('hover')}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <div className="h-72 w-full overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <span className="text-xs font-mono text-amber-400 self-end bg-neutral-950/80 px-2.5 py-1 rounded-full">
                      {post.tag}
                    </span>
                    <div>
                      <p className="text-xs text-neutral-100 line-clamp-2 mb-3">
                        {post.caption}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>@hbbsal</span>
                  <span>{post.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* External Social Profiles Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-amber-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-neutral-100">
                {language === 'tr' ? 'Habib Sal Resmî Sosyal Hesapları' : 'Habib Sal Official Social Networks'}
              </h4>
              <p className="text-xs text-neutral-400">
                {language === 'tr' ? 'Ağımıza katılın, güncellemeleri anlık takip edin.' : 'Join our network and follow real-time updates.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com/habibsal"
              target="_blank"
              rel="noreferrer"
              onClick={() => playUiSound('click')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-amber-400 text-xs font-medium transition-all"
            >
              <Twitter className="w-4 h-4 text-amber-400" />
              <span>X @habibsal</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
            <a
              href="https://www.instagram.com/hbbsal/"
              target="_blank"
              rel="noreferrer"
              onClick={() => playUiSound('click')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram @hbbsal</span>
              <ExternalLink className="w-3 h-3 text-neutral-950" />
            </a>
          </div>
        </div>

      </div>

      {/* Instagram Post Detail Modal */}
      {selectedIgPost && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
            <div className="relative h-80 sm:h-96 w-full">
              <img
                src={selectedIgPost.image}
                alt={selectedIgPost.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedIgPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 text-neutral-200 hover:text-amber-400 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                <span>@hbbsal • Instagram</span>
                <span>{selectedIgPost.location}</span>
              </div>
              <p className="text-sm text-neutral-200 mb-4 leading-relaxed">
                {selectedIgPost.caption}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                <div className="flex gap-4">
                  <span>❤️ {selectedIgPost.likes} Likes</span>
                  <span>💬 {selectedIgPost.comments} Comments</span>
                </div>
                <a
                  href="https://www.instagram.com/hbbsal/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Instagram'da Aç →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
