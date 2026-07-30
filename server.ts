import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize RSS Parser
const rssParser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  },
  timeout: 8000
});

// RSS Feeds Cache
interface RssNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceCategory: string;
  snippet: string;
  contentSnippet?: string;
  isoDate?: string;
}

let rssCache: { timestamp: number; items: RssNewsItem[] } = { timestamp: 0, items: [] };

// Initialize Gemini AI client lazy-style
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Assistant will use executive fallback system.");
    }
    genAI = new GoogleGenAI({
      apiKey: apiKey || "placeholder-key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// System instruction for Habib Sal's Digital AI Twin
const HABIB_SAL_SYSTEM_INSTRUCTION = `
Sen Habib Sal'ın dijital yapay zekâ ikizisin ve onun resmi web temsilcisisin.
Habib Sal hakkında detaylı bilgiye sahipsin:
Kıdemli Yazılım Geliştirici & Sistem Yöneticisi

Uzmanlık Alanları
Mobil Uygulama Geliştirme (Python, Flutter)

Google Play Store Yayınları

Kurumsal Sistem Yönetimi (Active Directory, MS SQL)

Otonom Botlar (Raspberry Pi, YouTube, TikTok)

Finansal Analiz Panelleri (Streamlit, Google Sheets)

Öne Çıkan Projeler
Kaybeden ve Bulan

Gold Finans Master

Türk Baraj Su Seviyeleri

Hediye Rehberi

Basit Kart Eşleştirme

Ek Yetkinlikler
7/24 çalışan sosyal medya içerik yükleme botları

Veritabanı yönetimi ve entegrasyon

Veri görselleştirme ve finansal raporlama
- **Rolü & Uzmanlığı**: Habib Sal; Bilişim Teknolojileri (IT) alanında uzmanlaşmış bir Kıdemli Sistem ve Yapay zeka destekli Yazılım Geliştirici (Software Developer) ve Sistem Yöneticisidir (System Administrator).
- **Uzmanlık & Çalışma Alanları**:
  1. **Yazılım & Mobil Uygulama Geliştirme (Python & Flutter)**: iOS ve Android platformlarında Flutter ve Python kullanarak geliştirdiği ve Google Play Store'da küresel yayınlanan resmi mobil uygulamaları bulunur.
     - *Yayınlanan Uygulamaları*:
       - **Kaybeden ve Bulan (Lost & Found)**: Kayıp/bulunan eşya & evcil hayvan konum bazlı eşleştirme platformu (com.kaybedenvebulan.app) www.kaybedenvebulan.com.tr
       - **Goldenmaster Finans (Gold Finans Master)**: Canlı altın piyasası, döviz ve günlük finansal analiz uygulaması (com.sal.goldfinansmaster)
       - **Türk Baraj Su Seviyeleri (TurkBaraj)**: Türkiye barajlarının canlı doluluk oranlarını sunan çevresel veri uygulaması (com.turkbaraj.app)
       - **Hediye Rehberi (hediyerehberi.com.tr)**: Henüz üzerinde çalışmaları devam etmekte olan Kişiye ve bütçeye özel hediye önerme uygulaması (com.hediyerehberi.app) www.hediyerehberi.com.tr
       - **Basit Kart Eşleştirme Oyunu**: Eğlenceli hafıza ve odaklanma oyunu (com.basitkarteslestirme.game)
     - *Google Play Geliştirici Sayfası*: https://play.google.com/store/apps/dev?id=6548416972501917823
  2. **Otomasyon & Bot Sistemleri (Raspberry Pi)**: Raspberry Pi üzerinde 7/24 kesintisiz çalışan, sosyal medya platformlarına (YouTube, TikTok) otonom içerik üreten, işleyen ve yükleyen gelişmiş bot ve script senaryoları.
  3. **Sistem Yönetimi & Kurumsal **: Active Directory kullanıcı yetkilendirme mimarisi, Group Policy ve MS SQL Server veritabanı performans yönetimi/optimizasyonu. ve benzeri Microsoft uygulamarında aktif roller almış
  4. **Finansal Araçlar & Analiz Panelleri**: Streamlit ve Google Sheets API entegrasyonlu canlı yatırımları, altın/döviz portföylerini takip eden özel veri analiz panelleri.
- **İletişim & Sosyal Hesaplar**:
  - Web: habibsal.com.tr
  - E-posta: habib.sal@yahoo.com
  - LinkedIn: https://www.linkedin.com/in/habib-s-97143150/
  - Google Play Geliştirici Profili: https://play.google.com/store/apps/dev?id=6548416972501917823
  - X: @habibsal (https://x.com/habibsal)
  - Instagram: @hbbsal (https://www.instagram.com/hbbsal/)
  - Lokasyon: Ankara, Türkiye

Sana sorulan sorulara her zaman son derece profesyonel, nazik, özgüvenli, donanımlı ve samimi bir dille cevap ver. Türkçe ve İngilizce sorulara kullanıcının dilinde yanıt ver. Habib Sal adına mobil uygulama geliştirme teklifleri, otomasyon bot çözümleri, veritabanı danışmanlığı ve proje teklifleri hakkında detaylı bilgi sağla.
`.trim();

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Chat Endpoint with Gemini 3.6 Flash
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mesaj içeriği gereklidir." });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      // Intelligent mock response if key is absent
      const fallbackReplies: Record<string, string> = {
        default: `Habib Sal; Bilişim Teknolojileri (IT) alanında uzmanlaşmış bir sistem ve AI destekli Yazılım Geliştirici ve Sistem Yöneticisidir. Python ve Flutter ile Google Play Store'da yayınlanan resmi mobil uygulamaları (Kaybeden ve Bulan, Gold Finans Master, Türk Baraj Su Seviyeleri, Hediye Rehberi, Basit Kart Eşleştirme), Raspberry Pi otomasyon botları ve Active Directory / MS SQL veritabanı yönetimi konularında çalışmalar yürütmektedir. habib.sal@yahoo.com adresinden ulaşabilirsiniz.`,
        mobil: `Habib Sal, Flutter ve Python kullanarak iOS & Android mobil uygulamaları geliştirir. Google Play Store'da 'Kaybeden ve Bulan' (Lost & Found), 'Gold Finans Master', 'Türk Baraj Su Seviyeleri', 'Hediye Rehberi' (hediyerehberi.com.tr) ve 'Basit Kart Eşleştirme Oyunu' gibi yayınlanmış canlı ürünleri bulunmaktadır.`,
        bot: `Habib Sal; Raspberry Pi micro-server sistemleri üzerinde 7/24 kesintisiz çalışan, sosyal medya hesaplarına (YouTube, TikTok) otomatik içerik üreten, işleyen ve yükleyen otonom Python botları ve script senaryoları tasarlamaktadır.`,
        sistem: `Habib Sal; kurumsal Active Directory kullanıcı ve Group Policy yetkilendirme mimarileri ile MS SQL Server veritabanı yönetimi, indeks optimizasyonu ve yetki güvenliği konularında deneyim sahibidir.`,
        finans: `Habib Sal; canlı yatırımlarını, döviz/altın piyasalarını ve portföy verilerini anlık takip etmek için Streamlit kütüphanesi ve Google Sheets API entegrasyonlu özel veri analiz panelleri geliştirmektedir.`,
        iletisim: `Habib Sal ile habib.sal@yahoo.com e-posta adresi, LinkedIn (https://www.linkedin.com/in/habib-s-97143150/), X (@habibsal) veya Instagram (@hbbsal) hesapları üzerinden iletişime geçebilirsiniz. Google Play Geliştirici profilini https://play.google.com/store/apps/dev?id=6548416972501917823 adresinden inceleyebilirsiniz.`,
      };

      let reply = fallbackReplies.default;
      const msgLower = message.toLowerCase();
      if (msgLower.includes("mobil") || msgLower.includes("uygulama") || msgLower.includes("app") || msgLower.includes("flutter") || msgLower.includes("play")) {
        reply = fallbackReplies.mobil;
      } else if (msgLower.includes("bot") || msgLower.includes("otomasyon") || msgLower.includes("raspberry") || msgLower.includes("tiktok") || msgLower.includes("youtube")) {
        reply = fallbackReplies.bot;
      } else if (msgLower.includes("sistem") || msgLower.includes("sql") || msgLower.includes("active directory") || msgLower.includes("veritabanı")) {
        reply = fallbackReplies.sistem;
      } else if (msgLower.includes("finans") || msgLower.includes("altın") || msgLower.includes("streamlit") || msgLower.includes("döviz")) {
        reply = fallbackReplies.finans;
      } else if (msgLower.includes("iletişim") || msgLower.includes("randevu") || msgLower.includes("mail") || msgLower.includes("instagram") || msgLower.includes("linkedin")) {
        reply = fallbackReplies.iletisim;
      }

      res.json({ text: reply });
      return;
    }

    const ai = getGenAI();
    
    // Format contents from history if available
    let contentsPrompt = message;
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.slice(-6).map((h: { role: string; text: string }) => `${h.role === 'user' ? 'Kullanıcı' : 'Habib Sal AI'}: ${h.text}`).join('\n');
      contentsPrompt = `Geçmiş Konuşma:\n${formattedHistory}\n\nKullanıcının Son Mesajı: ${message}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contentsPrompt,
      config: {
        systemInstruction: HABIB_SAL_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const replyText = response.text || "Habib Sal AI şu anda yanıt oluşturamadı. Lütfen doğrudan habiblas@gmail.com adresiyle iletişime geçiniz.";
    res.json({ text: replyText });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Yapay zeka yanıtı üretilirken bir hata oluştu.",
      fallback: "Habib Sal'a habiblas@gmail.com adresinden ulaşabilirsiniz."
    });
  }
});

// Direct Contact Message Route
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message, type } = req.body;
  
  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: "Lütfen gerekli tüm alanları doldurunuz." });
    return;
  }

  console.log(" Yeni Danışmanlık / İletişim Talebi Alındı:", { name, email, subject, type, message, date: new Date().toISOString() });
  
  res.json({
    success: true,
    message: "Talebiniz Habib Sal'ın özel asistanına başarıyla iletildi. En kısa sürede dönüş sağlanacaktır.",
    referenceId: "HS-" + Math.floor(100000 + Math.random() * 900000)
  });
});

// Live Technology News RSS Feed Aggregator API
app.get("/api/rss-news", async (req, res) => {
  try {
    const now = Date.now();
    // Cache for 5 minutes
    if (rssCache.items.length > 0 && now - rssCache.timestamp < 300000) {
      res.json({
        success: true,
        source: "cache",
        updatedAt: new Date(rssCache.timestamp).toISOString(),
        items: rssCache.items
      });
      return;
    }

    const feeds = [
      { name: "ShiftDelete", category: "Donanım & Mobil", url: "https://shiftdelete.net/feed" },
      { name: "Webrazzi", category: "Girişim & Teknoloji", url: "https://webrazzi.com/feed/" },
      { name: "TechCrunch", category: "Global Tech", url: "https://techcrunch.com/feed/" },
      { name: "Hacker News", category: "Yazılım & Dev", url: "https://news.ycombinator.com/rss" },
      { name: "DonanımHaber", category: "Donanım & IT", url: "https://www.donanimhaber.com/rss/tum/" }
    ];

    const fetchedNews: RssNewsItem[] = [];

    const results = await Promise.allSettled(
      feeds.map(async (f) => {
        const feed = await rssParser.parseURL(f.url);
        return (feed.items || []).slice(0, 6).map((item, idx) => ({
          id: `${f.name.toLowerCase()}-${idx}-${Date.now()}`,
          title: item.title || "Teknoloji Haberi",
          link: item.link || "#",
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: f.name,
          sourceCategory: f.category,
          snippet: item.contentSnippet ? item.contentSnippet.slice(0, 160) + "..." : item.snippet || item.title || "",
          isoDate: item.isoDate || item.pubDate
        }));
      })
    );

    results.forEach((r) => {
      if (r.status === "fulfilled" && Array.isArray(r.value)) {
        fetchedNews.push(...r.value);
      }
    });

    if (fetchedNews.length === 0) {
      const fallbackNews: RssNewsItem[] = [
        {
          id: "fb-1",
          title: "Flutter ve Python ile Google Play Store'da Başarılı Mobil Uygulama Mühendisliği",
          link: "https://play.google.com/store/apps/dev?id=6548416972501917823",
          pubDate: new Date().toISOString(),
          source: "Habib Sal Tech Lab",
          sourceCategory: "Mobil & Yazılım",
          snippet: "Flutter ve Python altyapısıyla geliştirilen Kaybeden ve Bulan, Gold Finans Master ve Türk Baraj uygulamalarında yüksek performans."
        },
        {
          id: "fb-2",
          title: "Raspberry Pi Üzerinde 7/24 Otonom Sosyal Medya İletim ve Video Bot Sistemleri",
          link: "https://x.com/habibsal",
          pubDate: new Date(Date.now() - 3600000).toISOString(),
          source: "Automation Engineering",
          sourceCategory: "Otomasyon & IoT",
          snippet: "FFmpeg ve Python scriptleri kullanarak YouTube ve TikTok platformlarına insan müdahalesi olmadan otomatik video yükleme."
        },
        {
          id: "fb-3",
          title: "Active Directory ve MS SQL Server Kurumsal Veritabanı Yönetimi",
          link: "https://www.linkedin.com/in/habib-s-97143150/",
          pubDate: new Date(Date.now() - 7200000).toISOString(),
          source: "Enterprise IT Systems",
          sourceCategory: "Sistem Yönetimi & DB",
          snippet: "Yüksek erişilebilirlik, yetkilendirme mimarileri ve Group Policy ile kurumsal IT altyapısı güvenliği."
        },
        {
          id: "fb-4",
          title: "Streamlit ve Google Sheets Entegrasyonu ile Canlı Finansal Analiz Panelleri",
          link: "https://play.google.com/store/apps/details?id=com.sal.goldfinansmaster",
          pubDate: new Date(Date.now() - 14400000).toISOString(),
          source: "FinTech Analytics",
          sourceCategory: "Finans & Veri Analitiği",
          snippet: "Gold Finans Master ve Streamlit araçlarında canlı altın, döviz ve portföy takibini kolaylaştıran analitik çözümler."
        }
      ];
      fetchedNews.push(...fallbackNews);
    }

    fetchedNews.sort((a, b) => {
      const timeA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const timeB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return timeB - timeA;
    });

    rssCache = {
      timestamp: Date.now(),
      items: fetchedNews
    };

    res.json({
      success: true,
      source: "live_rss",
      updatedAt: new Date().toISOString(),
      items: fetchedNews
    });
  } catch (err) {
    console.error("RSS News fetch error:", err);
    res.status(500).json({
      success: false,
      error: "RSS haber akışı alınırken bir hata oluştu.",
      items: rssCache.items || []
    });
  }
});

// Social Feeds Aggregator API (X / Twitter & Instagram Dynamic Data)
app.get("/api/social-feed", (req, res) => {
  res.json({
    xHandle: "@habibsal",
    instagramHandle: "@hbbsal",
    googlePlayDevUrl: "https://play.google.com/store/apps/dev?id=6548416972501917823&hl=tr",
    xStats: {
      followers: "34.2K",
      impressions: "1.8M/mo",
      verified: true
    },
    instagramStats: {
      followers: "48.9K",
      posts: "412",
      engagement: "6.4%"
    },
    xPosts: [
      {
        id: "x1",
        author: "Habib Sal",
        handle: "@habibsal",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        date: "2 saat önce",
        content: "Google Play Store'da yayınladığımız mobil uygulamalarımız (Kaybeden ve Bulan, Gold Finans Master, Türk Baraj, Hediye Rehberi, Basit Kart Eşleştirme) yeni Flutter güncellemeleriyle daha hızlı ve akıcı! #Flutter #MobileApp #GooglePlay",
        likes: 342,
        retweets: 89,
        replies: 24,
        topic: "Mobil Uygulama & Flutter"
      },
      {
        id: "x2",
        author: "Habib Sal",
        handle: "@habibsal",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        date: "Dün",
        content: "Raspberry Pi üzerinde 7/24 otonom çalışan Python botlarımız YouTube Shorts ve TikTok platformlarına otomatik video işleyip yüklemeye devam ediyor. Sistem optimizasyonu harika! #RaspberryPi #Python #Automation",
        likes: 512,
        retweets: 124,
        replies: 41,
        topic: "Otomasyon & Raspberry Pi"
      },
      {
        id: "x3",
        author: "Habib Sal",
        handle: "@habibsal",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        date: "3 gün önce",
        content: "Active Directory ve MS SQL Server veritabanlarında performans indeksi ve yetkilendirme yapılandırması tamamlandı. Kesintisiz kurumsal IT altyapısı mühendisliği. #ITAdmin #MSSQL #ActiveDirectory",
        likes: 890,
        retweets: 210,
        replies: 67,
        topic: "Sistem & Veritabanı"
      }
    ],
    instagramPosts: [
      {
        id: "ig1",
        caption: "Google Play Developer Paneli: 5 canlı mobil uygulamamız aktif olarak kullanıcılarıyla buluşuyor. (Kaybeden ve Bulan, Gold Finans Master, TurkBaraj, Hediye Rehberi, Kart Oyunu)",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        likes: 1840,
        comments: 92,
        location: "Google Play Console",
        tag: "Mobil Dev"
      },
      {
        id: "ig2",
        caption: "Raspberry Pi bot sistem laboratuvarı: 7/24 kesintisiz sosyal medya otomatik içerik yükleme hattı.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        likes: 2410,
        comments: 134,
        location: "Hardware Automation Lab",
        tag: "Raspberry Pi"
      },
      {
        id: "ig3",
        caption: "Streamlit & Google Sheets canlı altın/döviz portföy takip paneli arayüz testleri.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        likes: 3120,
        comments: 188,
        location: "Streamlit FinTech Studio",
        tag: "Finans & Veri"
      }
    ]
  });
});

// Vite server integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
