export type Language = 'tr' | 'en';
export type ThemeMode = 'obsidian' | 'pearl';

export interface ProfileInfo {
  name: string;
  titleTR: string;
  titleEN: string;
  taglineTR: string;
  taglineEN: string;
  bioTR: string;
  bioEN: string;
  location: string;
  email: string;
  website: string;
  xHandle: string;
  instagramHandle: string;
  linkedinUrl: string;
  googlePlayDevUrl?: string;
  stats: {
    yearsExperience: number;
    completedProjects: number;
    investmentPortfolio: string;
    monthlyReach: string;
  };
}

export interface PhilosophyPillar {
  id: string;
  titleTR: string;
  titleEN: string;
  descTR: string;
  descEN: string;
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  titleTR: string;
  titleEN: string;
  categoryTR: string;
  categoryEN: string;
  descTR: string;
  descEN: string;
  location?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'architecture' | 'tech' | 'venture' | 'creative';
  categoryLabelTR: string;
  categoryLabelEN: string;
  year: string;
  location: string;
  heroImage: string;
  gallery: string[];
  summaryTR: string;
  summaryEN: string;
  detailsTR: string;
  detailsEN: string;
  keyFeaturesTR: string[];
  keyFeaturesEN: string[];
  clientOrPartner?: string;
  metrics?: { labelTR: string; labelEN: string; value: string }[];
  featured?: boolean;
  playStoreUrl?: string;
  packageName?: string;
}

export interface ArticleItem {
  id: string;
  titleTR: string;
  titleEN: string;
  excerptTR: string;
  excerptEN: string;
  contentTR: string;
  contentEN: string;
  categoryTR: string;
  categoryEN: string;
  readTime: string;
  date: string;
  coverImage: string;
}

export interface TweetPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  topic: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  location: string;
  tag: string;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
