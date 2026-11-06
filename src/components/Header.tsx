import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Search, 
  Wrench, 
  Sliders, 
  Volume2, 
  Calendar, 
  Sun, 
  Moon, 
  Download, 
  Share2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import { BREAKING_TICKER } from '../data/mockArticles';

interface HeaderProps {
  magazineTitle: string;
  magazineSubtitle: string;
  issueNumber: string;
  issueDate: string;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenEditor: () => void;
  onOpenPdfModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  accentColor: string;
  onChangeAccentColor: (color: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  magazineTitle,
  magazineSubtitle,
  issueNumber,
  issueDate,
  bookmarksCount,
  onOpenBookmarks,
  onOpenEditor,
  onOpenPdfModal,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  accentColor,
  onChangeAccentColor
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Top Utility Ribbon */}
      <div className="bg-stone-950 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Edition & Date */}
          <div className="flex items-center gap-3">
            <span className="bg-amber-600/90 text-white font-bold px-2 py-0.5 rounded text-[11px] tracking-wide">
              {issueNumber}
            </span>
            <div className="flex items-center gap-1.5 text-stone-400">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{issueDate}</span>
              <span className="text-stone-600">•</span>
              <span className="hidden sm:inline">جمادى الأولى 1448 هـ</span>
            </div>
          </div>

          {/* Quick Actions & Hacker/Editor Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEditor}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium px-2.5 py-0.5 rounded text-[11px] shadow-sm transition-all transform hover:scale-105 cursor-pointer"
              title="لوحة التعديل السريع: غيّر عنوان المجلة، أضف مقالاً أو عدّل المحتوى فوراً"
            >
              <Wrench className="w-3 h-3 animate-spin-slow" />
              <span className="font-bold">هكّر وعدّل المجلة (Studio)</span>
              <span className="bg-emerald-900/60 text-[9px] px-1 rounded text-emerald-200 hidden md:inline">تجريبي</span>
            </button>

            <button
              onClick={onOpenPdfModal}
              className="hidden md:flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span>نسخة PDF للطباعة</span>
            </button>

            <div className="flex items-center gap-1 border-r border-stone-800 pr-2 mr-1">
              <button
                onClick={onToggleDarkMode}
                className="p-1 hover:text-white text-stone-400 rounded transition-colors cursor-pointer"
                title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left / Search & Bookmarks */}
          <div className="flex items-center gap-2 order-2 md:order-1 w-full md:w-auto justify-between md:justify-start">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="ابحث في مقالات المجلة..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 pl-4 pr-9 py-2 text-xs rounded-full border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-xs font-medium cursor-pointer"
              title="المقالات المحفوظة"
            >
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">محفوظاتي</span>
              {bookmarksCount > 0 && (
                <span className="bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>

          {/* Center Brand Identity (Editorial Grand Logo) */}
          <div className="text-center order-1 md:order-2">
            <div className="inline-flex flex-col items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-[10px] tracking-[0.25em] text-amber-700 dark:text-amber-400 font-bold uppercase mb-0.5">
                • مَجَلَّة رَقَمِيَّة شَهْرِيَّة مُسْتَقِلَّة •
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-white drop-shadow-sm transition-transform group-hover:scale-[1.01]">
                {magazineTitle}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-md font-sans-ar">
                {magazineSubtitle}
              </p>
            </div>
          </div>

          {/* Right / Accent colors & Issue preview badge */}
          <div className="hidden lg:flex items-center gap-3 order-3">
            <div className="text-left text-xs border-l border-stone-200 dark:border-stone-800 pl-3">
              <span className="block font-bold text-stone-800 dark:text-stone-200">النسخة التفاعلية</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                جاهز للعرض والتخصيص
              </span>
            </div>
            
            {/* Color switcher */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-full border border-stone-200 dark:border-stone-700" title="اختر طابع المجلة اللوني">
              <button 
                onClick={() => onChangeAccentColor('amber')}
                className={`w-4 h-4 rounded-full bg-amber-600 transition-all ${accentColor === 'amber' ? 'ring-2 ring-stone-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onChangeAccentColor('emerald')}
                className={`w-4 h-4 rounded-full bg-emerald-600 transition-all ${accentColor === 'emerald' ? 'ring-2 ring-stone-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onChangeAccentColor('indigo')}
                className={`w-4 h-4 rounded-full bg-indigo-600 transition-all ${accentColor === 'indigo' ? 'ring-2 ring-stone-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button 
                onClick={() => onChangeAccentColor('crimson')}
                className={`w-4 h-4 rounded-full bg-rose-600 transition-all ${accentColor === 'crimson' ? 'ring-2 ring-stone-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Breaking / Trending Ticker Line */}
      <div className="bg-stone-100/80 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-1 bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px] shrink-0">
            <Flame className="w-3 h-3 animate-bounce" />
            <span>موجز أفق</span>
          </div>
          <div className="overflow-hidden flex-1 relative h-5">
            <div 
              key={tickerIndex} 
              className="text-stone-700 dark:text-stone-300 font-medium truncate transition-all duration-500 transform translate-y-0 animate-fade-in flex items-center gap-2"
            >
              <span>{BREAKING_TICKER[tickerIndex]}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-stone-400 text-[11px] shrink-0">
            <button 
              onClick={() => setTickerIndex((prev) => (prev - 1 + BREAKING_TICKER.length) % BREAKING_TICKER.length)}
              className="hover:text-stone-700 dark:hover:text-stone-200 p-0.5"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span>{tickerIndex + 1}/{BREAKING_TICKER.length}</span>
            <button 
              onClick={() => setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER.length)}
              className="hover:text-stone-700 dark:hover:text-stone-200 p-0.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
