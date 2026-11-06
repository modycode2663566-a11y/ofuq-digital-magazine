export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  text: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string[]; // List of rich paragraphs
  quote?: {
    text: string;
    author: string;
  };
  category: string;
  author: Author;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  views: number;
  likes: number;
  isCoverStory?: boolean;
  isTrending?: boolean;
  audioDuration?: string;
  comments: Comment[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  color: string;
}

export type ThemeMode = 'light' | 'sepia' | 'dark';
export type FontSize = 'normal' | 'large' | 'huge';
export type AccentColor = 'emerald' | 'amber' | 'indigo' | 'crimson';
