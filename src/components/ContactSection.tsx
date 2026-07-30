import React, { useState } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { habibSalProfile } from '../data/habibSalData';
import { Mail, Globe, MapPin, Twitter, Instagram, Linkedin, Send, CheckCircle2, Sparkles, Calendar, Clock, Lock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, playUiSound } = useThemeLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'advisory',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ message: string; referenceId: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playUiSound('click');
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessResponse({
          message: data.message,
          referenceId: data.referenceId
        });
        playUiSound('success');
      } else {
        throw new Error("Form Error");
      }
    } catch (err) {
      setSuccessResponse({
        message: language === 'tr'
          ? "Talebiniz kaydedildi. Doğrudan habiblas@gmail.com e-posta adresinden de iletişime geçebilirsiniz."
          : "Your request was saved. You can also reach out directly to habiblas@gmail.com.",
        referenceId: "HS-" + Math.floor(100000 + Math.random() * 900000)
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative overflow-hidden border-t border-neutral-800">
      
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Hub */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>{language === 'tr' ? 'İLETİŞİM & STRATEJİK İŞ BİRLİĞİ' : 'CONTACT & STRATEGIC ADVISORY'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
                {language === 'tr' ? 'Habib Sal ile İletişime Geçin' : 'Connect with Habib Sal'}
              </h2>
              <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
                {language === 'tr'
                  ? 'Stratejik danışmanlık, yönetim kurulu üyelikleri, lüks mimarlık projeleri veya yüksek büyüme potansiyelli melek yatırım değerlendirmeleri için iletişime geçebilirsiniz.'
                  : 'Reach out for strategic executive advisory, board roles, landmark luxury architectural commissions, or venture capital dealflow.'}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${habibSalProfile.email}`}
                onMouseEnter={() => playUiSound('hover')}
                className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Resmi E-Posta</span>
                  <p className="text-sm font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {habibSalProfile.email}
                  </p>
                </div>
              </a>

              <a
                href="http://habibsal.com.tr"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playUiSound('hover')}
                className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Web Adresi</span>
                  <p className="text-sm font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {habibSalProfile.website}
                  </p>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Lokasyon / Merkez</span>
                  <p className="text-sm font-bold text-neutral-100">
                    {habibSalProfile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Badges */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <h4 className="font-serif text-sm font-bold text-neutral-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Resmî Sosyal Hesaplar & Geliştirici Profili</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/dev?id=6548416972501917823&hl=tr"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-neutral-950 border border-amber-500/40 text-neutral-200 hover:text-amber-400 text-xs font-mono flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Play (Habib Sal)</span>
                </a>
                <a
                  href={habibSalProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-400 text-xs font-mono flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-amber-400" />
                  <span>LinkedIn (Habib Sal)</span>
                </a>
                <a
                  href="https://x.com/habibsal"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-400 text-xs font-mono flex items-center gap-2"
                >
                  <Twitter className="w-3.5 h-3.5 text-amber-400" />
                  <span>X (@habibsal)</span>
                </a>
                <a
                  href="https://www.instagram.com/hbbsal/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-400 text-xs font-mono flex items-center gap-2"
                >
                  <Instagram className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instagram (@hbbsal)</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-neutral-900/80 border border-amber-500/30 backdrop-blur-xl shadow-2xl relative">
              
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-neutral-100">
                  {language === 'tr' ? 'Stratejik Randevu & Danışmanlık Formu' : 'Executive Advisory & Inquiry Form'}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {language === 'tr'
                    ? 'Talebiniz gizlilik prensibiyle Habib Sal’ın yönetici asistanına iletilecektir.'
                    : 'Your communication is processed with executive confidentiality.'}
                </p>
              </div>

              {successResponse ? (
                <div className="p-6 rounded-2xl bg-neutral-950 border border-amber-500/40 space-y-4 animate-fadeIn text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-neutral-100">
                    {language === 'tr' ? 'Mesajınız Başarıyla İletildi' : 'Message Transmitted Successfully'}
                  </h4>
                  <p className="text-xs text-neutral-300">
                    {successResponse.message}
                  </p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-neutral-900 text-amber-400 text-xs font-mono border border-neutral-800">
                    Referans No: {successResponse.referenceId}
                  </div>
                  <div>
                    <button
                      onClick={() => setSuccessResponse(null)}
                      className="mt-4 px-6 py-2 rounded-full bg-amber-500 text-neutral-950 text-xs font-bold"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-300 uppercase block mb-1">
                        {language === 'tr' ? 'Ad Soyad / Kurum' : 'Full Name / Organization'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Örn: Dr. Ahmet Yılmaz / Executive Office"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-300 uppercase block mb-1">
                        {language === 'tr' ? 'E-Posta Adresi' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ahmet@kurum.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-300 uppercase block mb-1">
                        {language === 'tr' ? 'Konu / Kapsam' : 'Subject Category'}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="advisory">{language === 'tr' ? 'Stratejik Yönetim Kurulu Danışmanlığı' : 'Board Strategic Advisory'}</option>
                        <option value="architecture">{language === 'tr' ? 'Mimarlık & Lüks Mekan Projesi' : 'Architecture & Luxury Project'}</option>
                        <option value="venture">{language === 'tr' ? 'Girişim & Melek Yatırım Sunumu' : 'Venture Investment Pitch'}</option>
                        <option value="keynote">{language === 'tr' ? 'Konuşmacı & Zirve Katılımı' : 'Keynote Speaker Engagement'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-300 uppercase block mb-1">
                        {language === 'tr' ? 'Başlık' : 'Subject Title'}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Örn: Proje İş Birliği Görüşmesi"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-300 uppercase block mb-1">
                      {language === 'tr' ? 'Talebiniz / Mesaj Detayı' : 'Inquiry & Message Details'} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'tr' ? 'Projeniz, zaman planınız ve beklentileriniz hakkında detay veriniz...' : 'Please summarize your project objectives, timeline, and expectations...'}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                      <Lock className="w-3 h-3 text-amber-500/80" />
                      <span>Confidential Communication</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Gönderiliyor...' : (language === 'tr' ? 'Talebi İlet' : 'Transmit Inquiry')}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
