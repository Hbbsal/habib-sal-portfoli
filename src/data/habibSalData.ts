import { ProfileInfo, PhilosophyPillar, TimelineMilestone, ProjectItem, ArticleItem } from '../types';

export const habibSalProfile: ProfileInfo = {
  name: "Habib Sal",
  titleTR: "Yazılım Geliştirici & Bilişim Teknolojileri (IT) Uzmanı | Sistem Yöneticisi",
  titleEN: "Software Developer & IT Systems Specialist | System Administrator",
  taglineTR: "Mobil Uygulamalar (Flutter & Python), Otonom Bot Sistemleri (Raspberry Pi) & Kurumsal IT Yönetimi",
  taglineEN: "Mobile App Development (Flutter & Python), Autonomous Bot Infrastructure (Raspberry Pi) & Enterprise IT Management",
  bioTR: "Habib Sal; Bilişim Teknolojileri (IT) alanında uzmanlaşmış kıdemli bir yazılım geliştirici ve sistem yöneticisidir. Python ve Flutter teknolojileriyle Google Play Store'da küresel yayınlanan mobil uygulamalar (Kaybeden ve Bulan, Gold Finans Master, Türk Baraj Su Seviyeleri, Hediye Rehberi, Basit Kart Eşleştirme) geliştirmektedir. Ayrıca Raspberry Pi üzerinde 7/24 çalışan otonom sosyal medya içerik yükleme botları (YouTube, TikTok), Active Directory ve MS SQL kurumsal veritabanı yönetimi ve Streamlit / Google Sheets entegre finansal analiz panelleri tasarlamaktadır.",
  bioEN: "Habib Sal is an IT Specialist, Software Developer, and System Administrator. He specializes in Flutter & Python mobile app engineering with published live apps on Google Play Store (Lost & Found, Gold Finans Master, TurkBaraj, Hediye Rehberi, Memory Card Game). He engineers 24/7 Raspberry Pi automation bots for YouTube & TikTok video publishing, manages enterprise Active Directory & MS SQL databases, and builds custom Streamlit & Google Sheets financial portfolio dashboards.",
  location: "Ankara, Türkiye",
  email: "habib.sal@yahoo.com",
  website: "habibsal.com.tr",
  xHandle: "@habibsal",
  instagramHandle: "@hbbsal",
  linkedinUrl: "https://www.linkedin.com/in/habib-s-97143150/",
  googlePlayDevUrl: "https://play.google.com/store/apps/dev?id=6548416972501917823&hl=tr",
  stats: {
    yearsExperience: 10,
    completedProjects: 45,
    investmentPortfolio: "Google Play Developer",
    monthlyReach: "100K+"
  }
};

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: "p1",
    titleTR: "Yazılım & Mobil Uygulama Geliştirme",
    titleEN: "Software & Mobile App Development",
    descTR: "Python ve Flutter teknolojileri kullanılarak Google Play Store'da küresel yayınlanan yüksek performanslı, sezgisel ve ölçeklenebilir mobil ürün mühendisliği.",
    descEN: "Engineering high-performance, fluid mobile applications published globally on Google Play using Python and Flutter frameworks.",
    iconName: "Smartphone"
  },
  {
    id: "p2",
    titleTR: "Otomasyon & Bot Sistemleri (Raspberry Pi)",
    titleEN: "Automation & Bot Systems (Raspberry Pi)",
    descTR: "Raspberry Pi üzerinde 7/24 otonom çalışan, YouTube ve TikTok gibi platformlara otomatik içerik üreten ve yükleyen gelişmiş bot ve komut senaryoları.",
    descEN: "Designing 24/7 autonomous bot pipelines running on Raspberry Pi micro-servers to render and publish content to YouTube and TikTok.",
    iconName: "Cpu"
  },
  {
    id: "p3",
    titleTR: "Sistem Yönetimi & Kurumsal Veritabanı",
    titleEN: "System Administration & Enterprise DB",
    descTR: "Active Directory kurumsal yetkilendirme altyapısı, politika yönetimi, MS SQL veritabanı bakımı, indeksleme ve sunucu güvenliği.",
    descEN: "Managing enterprise Active Directory security policies, access control governance, and high-availability MS SQL database architectures.",
    iconName: "TrendingUp"
  },
  {
    id: "p4",
    titleTR: "Finansal Veri Analizi & Özel Paneller",
    titleEN: "Financial Data & Analytics Dashboards",
    descTR: "Streamlit ve Google Sheets entegrasyonu ile canlı finans verilerini, yatırımları ve altın/döviz portföylerini takip eden özel analiz panelleri.",
    descEN: "Building custom financial analytics dashboards and portfolio trackers leveraging Streamlit, Python, and Google Sheets integration.",
    iconName: "Compass"
  }
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2026",
    titleTR: "Google Play Store Uygulama Portföyü & FinTech Genişlemesi",
    titleEN: "Google Play App Ecosystem & FinTech Portfolio",
    categoryTR: "Mobil & Yazılım",
    categoryEN: "Mobile & Software",
    descTR: "Google Play üzerinde yayınlanan 'Kaybeden ve Bulan', 'Gold Finans Master', 'Türk Baraj' ve 'Hediye Rehberi' mobil uygulamaları sürekli güncellenerek yayın hayatına devam ediyor.",
    descEN: "Expanded Google Play developer ecosystem featuring Lost & Found, Gold Finans Master, TurkBaraj, and Hediye Rehberi mobile apps.",
    location: "İstanbul, Türkiye"
  },
  {
    year: "2025",
    titleTR: "Raspberry Pi Otonom İçerik & Bot Sistemleri",
    titleEN: "Raspberry Pi Autonomous Media & Bot Systems",
    categoryTR: "Otomasyon & IoT",
    categoryEN: "Automation & IoT",
    descTR: "Raspberry Pi üzerinde 7/24 çalışan, sosyal medya kanallarına (YouTube, TikTok) otonom içerik üreten ve yükleyen script sistemleri yayına alındı.",
    descEN: "Deployed automated Python rendering and publishing bots on Raspberry Pi for YouTube and TikTok content distribution.",
    location: "İstanbul, Türkiye"
  },
  {
    year: "2024",
    titleTR: "Streamlit & Google Sheets Finans Analiz Panelleri",
    titleEN: "Streamlit & Google Sheets Financial Dashboards",
    categoryTR: "Veri Analizi & Finans",
    categoryEN: "Data Analytics & Finance",
    descTR: "Canlı altın, döviz ve borsa yatırımlarını anlık işleyen ve görselleştiren özel Streamlit finansal kontrol panelleri geliştirildi.",
    descEN: "Created custom Streamlit & Google Sheets integrated portfolio dashboards for real-time asset & precious metal tracking.",
    location: "İstanbul, Türkiye"
  },
  {
    year: "2022",
    titleTR: "Kurumsal Sistem Yönetimi (Active Directory & MS SQL)",
    titleEN: "Enterprise System Administration (Active Directory & MS SQL)",
    categoryTR: "IT & Sistem Yönetimi",
    categoryEN: "IT & Systems Admin",
    descTR: "Kurumsal seviyede Active Directory yetkilendirme mimarileri ve MS SQL veritabanı performans yönetim süreçleri yürütüldü.",
    descEN: "Managed corporate Active Directory domain architectures, Group Policies, and MS SQL Server database reliability.",
    location: "İstanbul, Türkiye"
  }
];

export const projectPortfolio: ProjectItem[] = [
  {
    id: "proj-kaybeden-bulan",
    title: "Kaybeden ve Bulan (Lost & Found)",
    category: "tech",
    categoryLabelTR: "Mobil Uygulama & Flutter",
    categoryLabelEN: "Mobile App & Flutter",
    year: "Yayınlandı",
    location: "Google Play Store",
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Google Play Store'da küresel yayınlanan; kayıp ve bulunan eşyaların, nesnelerin ve evcil hayvanların konum bazlı eşleştirilmesini sağlayan mobil uygulama.",
    summaryEN: "Globally published Google Play mobile app enabling location-based reporting and smart matching of lost and found items.",
    detailsTR: "Habib Sal tarafından geliştirilen 'Kaybeden ve Bulan'; kayıp veya bulunan eşyaların harita üzerinde konumlandırılması, detaylı açıklama ve fotoğraflarla ilan oluşturulması ve kayıp sahiplerinin doğrudan iletişim kurmasını sağlayan yenilikçi bir platformdur.",
    detailsEN: "Engineered by Habib Sal, Lost & Found allows users to pinpoint lost or found items on Google Maps, upload details, and receive instant match alerts.",
    keyFeaturesTR: [
      "Flutter ile Geliştirilmiş Akıcı Mobil Kullanıcı Arayüzü",
      "Google Maps Harita Konum Pinleme & Mesafe Filtresi",
      "Anlık Bildirimler ve Güvenli Kullanıcı İletişim Modülü",
      "Kategori Bazlı Akıllı Eşleştirme Algoritması"
    ],
    keyFeaturesEN: [
      "Fluid Mobile UI Built with Flutter",
      "Google Maps Geo-Location Pinning & Distance Filtering",
      "Instant Push Notifications & Secure In-App Messaging",
      "Smart Category-Based Matchmaking Engine"
    ],
    clientOrPartner: "Habib Sal (Google Play)",
    metrics: [
      { labelTR: "Platform", labelEN: "Platform", value: "Google Play Store" },
      { labelTR: "Paket ID", labelEN: "Package ID", value: "com.kaybedenvebulan.app" }
    ],
    featured: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kaybedenvebulan.app&hl=tr",
    packageName: "com.kaybedenvebulan.app"
  },
  {
    id: "proj-goldenmaster-finans",
    title: "Goldenmaster Finans (Gold Finans Master)",
    category: "tech",
    categoryLabelTR: "Mobil FinTech & Veri",
    categoryLabelEN: "Mobile FinTech & Data",
    year: "Yayınlandı",
    location: "Google Play Store",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Günlük canlı altın piyasası verilerini, döviz kurlarını ve finansal analizleri kullanıcılarıyla paylaşan mobil finans uygulaması.",
    summaryEN: "Mobile financial analytics and live daily gold market tracking app delivering real-time currency & precious metal feeds.",
    detailsTR: "Kullanıcıların günlük piyasa hareketlerini, çeyrek/gram altın fiyatlarını ve döviz kurlarını anlık takip etmesine olanak tanıyan finans aracı. Python veritabanı botları ve Streamlit veri analitiği mantığıyla desteklenmektedir.",
    detailsEN: "Delivers live daily precious metals rates and currency exchange analytics to smartphone screens. Backed by Python financial scrapers.",
    keyFeaturesTR: [
      "Canlı Günlük Altın ve Döviz Piyasa Akışı",
      "Görsel Trend Grafikleri ve Anlık Fiyat Değişim Alarmları",
      "Kişisel Yatırım Varlığı Takip Paneli",
      "Hızlı ve Düşük Bellek Kullanımlı Mobil Arayüz"
    ],
    keyFeaturesEN: [
      "Real-Time Daily Gold & Exchange Market Feeds",
      "Visual Trend Charts & Instant Price Alerts",
      "Personal Investment Asset Tracker",
      "Lightweight High-Speed Mobile UI"
    ],
    clientOrPartner: "Habib Sal (Google Play)",
    metrics: [
      { labelTR: "Platform", labelEN: "Platform", value: "Google Play Store" },
      { labelTR: "Paket ID", labelEN: "Package ID", value: "com.sal.goldfinansmaster" }
    ],
    featured: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.sal.goldfinansmaster",
    packageName: "com.sal.goldfinansmaster"
  },
  {
    id: "proj-turk-baraj",
    title: "Türk Baraj Su Seviyeleri (TurkBaraj)",
    category: "tech",
    categoryLabelTR: "Veri Analizi & Mobil App",
    categoryLabelEN: "Data Analytics & Mobile App",
    year: "Yayınlandı",
    location: "Google Play Store",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Türkiye'de bulunan tüm barajların güncel su seviyelerini, doluluk oranlarını ve dönemsel grafikleri kullanıcılarla paylaşan mobil uygulama.",
    summaryEN: "Mobile app providing real-time dam fill rates, water levels, and seasonal environmental metrics across Turkey.",
    detailsTR: "Türkiye genelindeki barajların canlı doluluk yüzdelerini şeffaf bir şekilde sunan çevresel veri mobil uygulaması. Açık veri kaynaklarını otonom tarayan Python botları ile güncel verileri düzenli olarak çeker.",
    detailsEN: "Visualizes real-time reservoir capacity and historical fill rate trends in Turkey. Automated Python scrapers fetch daily municipal water metrics.",
    keyFeaturesTR: [
      "İllere ve Barajlara Göre Doluluk Oranı Filtreleme",
      "Yıllık ve Aylık Su Seviyesi Karşılaştırma Grafikleri",
      "Otonom Veri Çekme Hizmeti (Python Scraper)",
      "Sade ve Anlaşılır Mobil Tasarım"
    ],
    keyFeaturesEN: [
      "City & Dam Reservoir Level Filtering",
      "Historical Water Capacity Comparison Charts",
      "Automated Python Data Aggregator",
      "Clean & Accessible Mobile UI"
    ],
    clientOrPartner: "Habib Sal (Google Play)",
    metrics: [
      { labelTR: "Platform", labelEN: "Platform", value: "Google Play Store" },
      { labelTR: "Paket ID", labelEN: "Package ID", value: "com.turkbaraj.app" }
    ],
    featured: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.turkbaraj.app",
    packageName: "com.turkbaraj.app"
  },
  {
    id: "proj-hediye-rehberi",
    title: "Hediye Rehberi (hediyerehberi.com.tr)",
    category: "tech",
    categoryLabelTR: "Öneri Algoritması & Mobil",
    categoryLabelEN: "Recommendation Engine & Mobile",
    year: "Yayınlandı",
    location: "Google Play Store",
    heroImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "hediyerehberi.com.tr altyapısıyla entegre; kişiye, bütçeye ve özel günlere göre kişiselleştirilmiş hediye öneren akıllı mobil uygulama.",
    summaryEN: "Smart mobile gift recommendation engine integrated with hediyerehberi.com.tr tailored by recipient profile and budget.",
    detailsTR: "Doğum günü, yıldönümü veya özel günler için ideal hediyeyi bulmayı kolaylaştıran mobil rehber. Kullanıcının girdiği yaş, ilgi alanı ve bütçe kriterlerine göre nokta atışı öneriler sunar.",
    detailsEN: "Mobile app extension for hediyerehberi.com.tr, offering algorithmic gift suggestions based on demographic profile, occasions, and budget constraints.",
    keyFeaturesTR: [
      "Kişiye ve Özel Güne Göre Akıllı Öneri Algoritması",
      "Bütçe Aralığı ve Kategori Filtreleme",
      "hediyerehberi.com.tr Platformu ile Canlı Entegrasyon",
      "Favori Öneri Listesi Oluşturma"
    ],
    keyFeaturesEN: [
      "Demographic & Occasion Gift Matchmaking Engine",
      "Price Range & Interest Filter Systems",
      "Direct Synchronization with hediyerehberi.com.tr",
      "Personalized Gift Wishlists"
    ],
    clientOrPartner: "hediyerehberi.com.tr",
    metrics: [
      { labelTR: "Platform", labelEN: "Platform", value: "Google Play Store" },
      { labelTR: "Paket ID", labelEN: "Package ID", value: "com.hediyerehberi.app" }
    ],
    featured: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hediyerehberi.app",
    packageName: "com.hediyerehberi.app"
  },
  {
    id: "proj-kart-eslestirme",
    title: "Basit Kart Eşleştirme Oyunu",
    category: "creative",
    categoryLabelTR: "Mobil Oyun & Flutter",
    categoryLabelEN: "Mobile Game & Flutter",
    year: "Yayınlandı",
    location: "Google Play Store",
    heroImage: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Hafıza geliştirici, eğlenceli ve akıcı görsellere sahip basit eşleştirme kart birleştirme mobil oyunu.",
    summaryEN: "Brain-training memory card matching mobile game engineered with smooth animations and intuitive controls.",
    detailsTR: "Flutter görsel motoru ile geliştirilmiş, kullanıcıların odaklanma ve görsel hafıza becerilerini geliştiren mobil oyun uygulaması.",
    detailsEN: "Engineered with Flutter, this offline-friendly memory game features progressive levels, custom card graphics, and smooth touch mechanics.",
    keyFeaturesTR: [
      "Çeşitli Zorluk Seviyeleri ve Kart Desteleri",
      "Skor Takibi ve En Hızlı Süre Kaydı",
      "İnternetsiz Çevrimdışı Oynanabilirlik",
      "Hafıza ve Odaklanma Geliştirici Tasarım"
    ],
    keyFeaturesEN: [
      "Multiple Difficulty Grids & Card Sets",
      "High Score & Speed Timer Tracking",
      "100% Offline Playability",
      "Cognitive Memory Enhancement Gameplay"
    ],
    clientOrPartner: "Habib Sal (Google Play)",
    metrics: [
      { labelTR: "Platform", labelEN: "Platform", value: "Google Play Store" },
      { labelTR: "Paket ID", labelEN: "Package ID", value: "com.basitkarteslestirme.game" }
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.basitkarteslestirme.game",
    packageName: "com.basitkarteslestirme.game"
  },
  {
    id: "proj-raspberry-bot",
    title: "Raspberry Pi Sosyal Medya Otomasyonu & Bot Sistemleri",
    category: "tech",
    categoryLabelTR: "Otomasyon & Python Bot",
    categoryLabelEN: "Automation & Python Bot",
    year: "Aktif Sistem",
    location: "Raspberry Pi Micro-Server Cluster",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Raspberry Pi üzerinde 7/24 kesintisiz çalışan, YouTube ve TikTok hesaplarına otonom içerik üreten ve yükleyen bot altyapısı.",
    summaryEN: "24/7 Raspberry Pi micro-server bot infrastructure rendering and auto-uploading video content to YouTube and TikTok.",
    detailsTR: "Python betikleri, FFmpeg medya işleyicileri ve platform API entegrasyonları ile veri akışlarından otomatik kısa format (Shorts/Reels/TikTok) videolar oluşturan ve zamanlanmış olarak yayınlayan otonom otomasyon projesi.",
    detailsEN: "Automated video production and publishing pipeline running headless on Raspberry Pi. Generates media from custom data sources, renders clips, and handles API authentication for YouTube & TikTok uploads.",
    keyFeaturesTR: [
      "7/24 Düşük Güç Tüketimli Raspberry Pi Sunucu Mimarisi",
      "Python, FFmpeg & API ile Otomatik Medya Oluşturma",
      "YouTube Data API & TikTok Upload Otomasyonu",
      "Hata Loglama ve Telegram Üzerinden Anlık Durum Bildirimi"
    ],
    keyFeaturesEN: [
      "24/7 Low-Power Raspberry Pi Headless Infrastructure",
      "Automated Media Generation via Python & FFmpeg",
      "YouTube Data API & TikTok Publishing Integration",
      "Error Logging & Live Telegram Status Alerts"
    ],
    clientOrPartner: "Habib Sal Internal Labs",
    metrics: [
      { labelTR: "Uptime", labelEN: "Uptime", value: "99.9%" },
      { labelTR: "Donanım", labelEN: "Hardware", value: "Raspberry Pi" }
    ]
  },
  {
    id: "proj-streamlit-finance",
    title: "Streamlit & Google Sheets Finans Analiz Paneli",
    category: "tech",
    categoryLabelTR: "Veri Analizi & Python",
    categoryLabelEN: "Data Analytics & Python",
    year: "Aktif Sistem",
    location: "Özel Web Cloud",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    summaryTR: "Kişisel finans verilerini, altın/döviz yatırımlarını ve portföy dağılımlarını Streamlit ve Google Sheets API ile izleyen özel analitik araç.",
    summaryEN: "Custom Streamlit analytics dashboard integrating Google Sheets API for real-time asset tracking and investment reporting.",
    detailsTR: "Habib Sal'ın kişisel ve kurumsal yatırımlarını tek noktadan izlemek üzere Python ve Streamlit ile geliştirdiği özel panel. Google Sheets verilerini canlı çekerek kâr/zarar, varlık dağılımı ve grafiksel raporlar oluşturur.",
    detailsEN: "Personal wealth and investment analysis portal engineered by Habib Sal using Streamlit. Fetches live data from Google Sheets API to generate P&L analytics, asset allocation charts, and market reports.",
    keyFeaturesTR: [
      "Streamlit & Python Veri Görselleştirme Altyapısı",
      "Google Sheets API Canlı Çift Yönlü Veri Senkronizasyonu",
      "Anlık Kâr / Zarar & Varlık Dağılım Grafikleri",
      "Özel Güvenlikli Erişim Katmanı"
    ],
    keyFeaturesEN: [
      "Streamlit & Python Data Visualization Framework",
      "Live Two-Way Google Sheets API Sync",
      "Real-Time P&L & Asset Allocation Charts",
      "Secure Authenticated Dashboard Access"
    ],
    clientOrPartner: "Habib Sal Portfolio Suite",
    metrics: [
      { labelTR: "Framework", labelEN: "Framework", value: "Streamlit / Python" },
      { labelTR: "Veri Kaynağı", labelEN: "Data Source", value: "Google Sheets API" }
    ]
  }
];

export const articlesList: ArticleItem[] = [
  {
    id: "art-1",
    titleTR: "Flutter ve Python ile Google Play Store'da Başarılı Mobil Uygulama Yayınlama Rehberi",
    titleEN: "Publishing High-Performance Mobile Apps on Google Play using Flutter and Python",
    excerptTR: "Kaybeden ve Bulan, Gold Finans Master ve Türk Baraj uygulamaları deneyimleriyle mobil uygulama geliştirme ve yayınlama süreçleri.",
    excerptEN: "Lessons learned from building and deploying live production apps like Lost & Found, Gold Finans Master, and TurkBaraj on Google Play Store.",
    contentTR: "Mobil uygulama geliştirme sürecinde doğru teknoloji seçimi projenin başarısını belirleyen en önemli faktördür. Flutter, tek bir kod tabanıyla hem iOS hem de Android için yüksek performanslı ve 60 FPS akıcı arayüzler geliştirmeye imkan tanırken; arka planda Python ile desteklenen veri scraping ve backend hatları uygulamanın sürekli güncel kalmasını sağlar. 'Kaybeden ve Bulan' ile 'Gold Finans Master' uygulamalarımızda bu kombinasyonu başarıyla uyguladık...",
    contentEN: "Selecting the optimal technology stack dictates mobile application performance. Flutter provides cross-platform high-throughput UI compilation, while Python backends handle reliable data scraping and API pipelines. Across live products such as Lost & Found and Gold Finans Master, this architectural pairing guarantees instant user response and effortless maintenance...",
    categoryTR: "Mobil Uygulama",
    categoryEN: "Mobile Engineering",
    readTime: "5 dk",
    date: "15 Temmuz 2026",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "art-2",
    titleTR: "Raspberry Pi İle Sosyal Medya Otomasyonu ve 7/24 Otonom Bot Tasarımı",
    titleEN: "Building 24/7 Autonomous Social Media Upload Bots on Raspberry Pi",
    excerptTR: "YouTube ve TikTok platformlarına otomatik video üreten, FFmpeg ile işleyen ve zamanlanmış yükleme yapan Raspberry Pi mimarisi.",
    excerptEN: "Designing headless Python scripts on Raspberry Pi for automated rendering and publishing of Shorts/Reels to YouTube and TikTok.",
    contentTR: "Sosyal medya yönetimi ve içerik yayıncılığında otomasyon, zaman yönetimini baştan aşağı değiştiriyor. Düşük güç tüketen bir Raspberry Pi cihazını micro-server olarak kurgulayıp Python, FFmpeg ve API entegrasyonlarıyla güçlendirdiğinizde; YouTube ve TikTok hesaplarına 7/24 kesintisiz içerik yükleyen otonom bir medya fabrikasına sahip olursunuz...",
    contentEN: "Automation redefines modern digital media operations. By deploying headless Python scripts onto low-power Raspberry Pi micro-servers, creators can compile, process via FFmpeg, and upload scheduled videos directly to YouTube and TikTok via official APIs without manual intervention...",
    categoryTR: "Otomasyon & Bot",
    categoryEN: "Automation & IoT",
    readTime: "6 dk",
    date: "04 Haziran 2026",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "art-3",
    titleTR: "Streamlit ve Google Sheets İle Özel Finans Portföy Takip Paneli Oluşturma",
    titleEN: "Building Custom Financial Analytics Dashboards with Streamlit and Google Sheets",
    excerptTR: "Yatırım verilerini, altın/döviz kurlarını ve varlık dağılımını canlı olarak takip eden web tabanlı analitik çözümler.",
    excerptEN: "Creating real-time web analytics and wealth tracking portals using Python Streamlit framework and Google Sheets API.",
    contentTR: "Finansal verileri ve yatırımları efektif yönetmek için karmaşık yazılımlara bağımlı olmak zorunda değilsiniz. Python tabanlı Streamlit kütüphanesi ve Google Sheets API entegrasyonu sayesinde kendi varlıklarınızı, canlı altın kurlarını ve kâr/zarar durumunuzu anlık görselleştiren son derece güvenli ve hızlı paneller inşa edebilirsiniz...",
    contentEN: "Tracking investment portfolios and precious metal movements can be streamlined without heavy enterprise bloat. Combining Python Streamlit with Google Sheets API creates responsive, secure, and customizable wealth management dashboards with real-time data feeds...",
    categoryTR: "Finans & Veri",
    categoryEN: "Finance & Data",
    readTime: "4 dk",
    date: "12 Mayıs 2026",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];
