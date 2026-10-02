import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode, ProjectItem, ArticleItem } from '../types';

interface ThemeLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playUiSound: (type?: 'click' | 'hover' | 'open' | 'success') => void;
  aiModalOpen: boolean;
  setAiModalOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  caseStudyProject: ProjectItem | null;
  setCaseStudyProject: (proj: ProjectItem | null) => void;
  articleModalItem: ArticleItem | null;
  setArticleModalItem: (article: ArticleItem | null) => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<ThemeMode>('obsidian');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [caseStudyProject, setCaseStudyProject] = useState<ProjectItem | null>(null);
  const [articleModalItem, setArticleModalItem] = useState<ArticleItem | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove('obsidian', 'pearl');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Luxury Web Audio API feedback
  const playUiSound = (type: 'click' | 'hover' | 'open' | 'success' = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.15);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio context silenced or blocked
    }
  };

  const toggleTheme = () => {
    playUiSound('click');
    setTheme(prev => (prev === 'obsidian' ? 'pearl' : 'obsidian'));
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        setLanguage: (lang) => {
          playUiSound('click');
          setLanguage(lang);
        },
        theme,
        setTheme,
        toggleTheme,
        soundEnabled,
        setSoundEnabled,
        playUiSound,
        aiModalOpen,
        setAiModalOpen: (open) => {
          if (open) playUiSound('open');
          setAiModalOpen(open);
        },
        activeSection,
        setActiveSection,
        caseStudyProject,
        setCaseStudyProject: (proj) => {
          if (proj) playUiSound('open');
          setCaseStudyProject(proj);
        },
        articleModalItem,
        setArticleModalItem: (art) => {
          if (art) playUiSound('open');
          setArticleModalItem(art);
        }
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};
