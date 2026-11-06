import React from 'react';
import { Article } from '../types/magazine';
import { Clock, Bookmark, Heart, Headphones, ArrowLeft, Eye } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  onPlayAudio: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  variant?: 'card' | 'compact' | 'horizontal';
}

const CATEGORY_LABELS: Record<string, { label: string; colorClass: string }> = {
  tech: { label: 'تكنولوجيا', colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' },
  thought: { label: 'فكر ومجتمع', colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300' },
  business: { label: 'ريادة وأعمال', colorClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' },
  science: { label: 'علوم واستكشاف', colorClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300' },
  culture: { label: 'فنون وتصميم', colorClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300' },
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  onPlayAudio,
  isBookmarked,
  onToggleBookmark,
  variant = 'card'
}) => {
  const cat = CATEGORY_LABELS[article.category] || { label: article.category, colorClass: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300' };

  if (variant === 'compact') {
    return (
      <article className="group flex items-start gap-4 p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all hover:shadow-sm">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0 group-hover:scale-102 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.colorClass}`}>
              {cat.label}
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <h3
            onClick={() => onRead(article)}
            className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-white line-clamp-2 leading-snug cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
          >
            {article.title}
          </h3>
          <div className="flex items-center justify-between mt-2 text-xs text-stone-500">
            <span className="truncate">{article.author.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlayAudio(article)}
                className="hover:text-amber-600 p-1 transition-colors"
                title="استمع"
              >
                <Headphones className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`p-1 transition-colors ${isBookmarked ? 'text-amber-600' : 'hover:text-amber-600'}`}
                title="حفظ"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 transition-all shadow-xs hover:shadow-md">
        <div className="md:col-span-5 relative overflow-hidden rounded-xl aspect-[16/10] md:aspect-auto">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${cat.colorClass}`}>
            {cat.label}
          </span>
        </div>
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            <h3
              onClick={() => onRead(article)}
              className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2 leading-tight cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
            >
              {article.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {article.author.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlayAudio(article)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <Headphones className="w-3 h-3 text-amber-500" />
                <span>استماع</span>
              </button>
              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`p-1.5 rounded-lg border cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                    : 'text-stone-400 hover:text-stone-700 border-stone-200 dark:border-stone-700'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid Card
  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400/80 dark:hover:border-amber-500/60 transition-all duration-300 shadow-xs hover:shadow-xl overflow-hidden">
      <div>
        {/* Cover image container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md ${cat.colorClass}`}>
              {cat.label}
            </span>
          </div>
          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500 text-stone-950 scale-105'
                : 'bg-stone-900/60 text-white hover:bg-stone-900/90'
            }`}
            title={isBookmarked ? 'إلغاء الحفظ' : 'حفظ المقال'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h3
            onClick={() => onRead(article)}
            className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-white line-clamp-2 leading-snug cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2"
          >
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        {/* Author info */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover shrink-0 border border-stone-200 dark:border-stone-700"
          />
          <span className="font-semibold text-stone-800 dark:text-stone-200 truncate text-[11px] sm:text-xs">
            {article.author.name}
          </span>
        </div>

        {/* Read / Listen buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onPlayAudio(article)}
            className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            title="استمع للمقال"
          >
            <Headphones className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onRead(article)}
            className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            <span>اقرأ</span>
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
