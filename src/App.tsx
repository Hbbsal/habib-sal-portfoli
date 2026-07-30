import React from 'react';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { RssTechNewsSection } from './components/RssTechNewsSection';
import { SocialFeedHub } from './components/SocialFeedHub';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CaseStudyModal } from './components/CaseStudyModal';

export default function App() {
  return (
    <ThemeLanguageProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950 transition-colors duration-500">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <PortfolioSection />
          <RssTechNewsSection />
          <SocialFeedHub />
          <ArticlesSection />
          <ContactSection />
        </main>
        <Footer />
        <AiAssistantModal />
        <CaseStudyModal />
      </div>
    </ThemeLanguageProvider>
  );
}
