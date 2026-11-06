import React from 'react';
import { Article } from '../types/magazine';
import { 
  Sparkles, 
  Clock, 
  Headphones, 
  Bookmark, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Eye,
  Check
} from 'lucide-react';

interface CoverStoryHeroProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  onPlayAudio: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onShare: (article: Article) => void;
  accentColor: string;
}

export const CoverStoryHero: React.FC<CoverStoryHeroProps> = ({
  article,
  onReadArticle,
  onPlayAudio,
  isBookmarked,
  onToggleBookmark,
  onShare,
  accentColor
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-stone-900 text-white shadow-xl border border-stone-800">
      {/* Background Graphic Blur Accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        
        {/* Visual Cover Art / Image Column */}
        <div className="lg:col-span-7 relative group min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden order-1 lg:order-2">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent lg:bg-gradient-to-l lg:from-stone-950 lg:via-stone-950/50 lg:to-transparent" />
          
          {/* Overlay Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-amber-500 text-stone-950 font-black text-xs px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>قصة الغلاف • العدد الحصري</span>
            </span>
          </div>

          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-xs text-stone-300">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-700/60">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                <span>{article.views.toLocaleString('ar-EG')} قارئ</span>
              </span>
              <span className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-700/60">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>{article.likes.toLocaleString('ar-EG')} إعجاب</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1 bg-gradient-to-b from-stone-900 to-stone-950">
          <div>
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full">
                تحقيق استقصائي معمق
              </span>
              <span className="flex items-center gap-1 text-stone-400 text-xs">
                <Clock className="w-3 h-3 text-stone-500" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Headline */}
            <h2 
              onClick={() => onReadArticle(article)}
              className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight hover:text-amber-300 transition-colors cursor-pointer mb-3"
            >
              {article.title}
            </h2>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-sm font-medium text-stone-300 mb-4 line-clamp-2 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Author Strip */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-800/60 border border-stone-800 mb-6">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-amber-500/50 shadow-sm"
              />
              <div className="min-w-0">
                <span className="block text-xs text-stone-400">بقلم الكاتبة:</span>
                <span className="font-bold text-sm text-stone-100 truncate block">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-stone-400 truncate block">
                  {article.author.role}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onReadArticle(article)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>قراءة التحقيق كاملاً</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPlayAudio(article)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
                title="استمع للنسخة الصوتية المسجلة"
              >
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">استمع</span>
                <span className="text-[11px] text-stone-400">({article.audioDuration})</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isBookmarked 
                    ? 'bg-amber-500 text-stone-950 border-amber-400' 
                    : 'bg-stone-800/80 text-stone-400 hover:text-white border-stone-700'
                }`}
                title={isBookmarked ? 'محفوظ في قائمتك' : 'حفظ للقراءة لاحقاً'}
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={() => onShare(article)}
                className="p-2.5 rounded-xl bg-stone-800/80 text-stone-400 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                title="مشاركة المقال"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
