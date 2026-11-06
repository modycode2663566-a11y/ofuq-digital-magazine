import React from 'react';
import { Article } from '../types/magazine';
import { TrendingUp, Quote, Mic, BarChart3, Clock, ArrowLeft, Headphones, Sparkles } from 'lucide-react';

interface EditorialSectionsProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onPlayAudio: (article: Article) => void;
}

export const EditorialSections: React.FC<EditorialSectionsProps> = ({
  articles,
  onReadArticle,
  onPlayAudio
}) => {
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 4);
  const opinionArticle = articles.find((a) => a.category === 'thought') || articles[2] || articles[0];

  return (
    <div className="space-y-12">
      
      {/* SECTION 1: Trending Leaderboard & Guest Op-Ed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Most Read / Trending Leaderboard (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white">
                الأكثر قراءة هذا الأسبوع
              </h3>
            </div>
            <span className="text-[11px] font-bold text-stone-400">محدث لحظياً</span>
          </div>

          <div className="space-y-5">
            {trendingArticles.map((art, index) => (
              <div
                key={art.id}
                onClick={() => onReadArticle(art)}
                className="group flex items-start gap-4 cursor-pointer"
              >
                {/* Ranking Numeral */}
                <span className="font-editorial text-3xl sm:text-4xl font-black text-stone-300 dark:text-stone-700 group-hover:text-amber-500 transition-colors shrink-0 w-8 text-center leading-none">
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{art.author.name}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-editorial font-bold text-sm sm:text-base text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Op-Ed / Guest Essay (7 Cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-3 h-3" />
                <span>مقال الرأي والكاتب الضيف</span>
              </span>
              <span className="text-xs text-stone-400">{opinionArticle.date}</span>
            </div>

            <h3 
              onClick={() => onReadArticle(opinionArticle)}
              className="font-editorial text-2xl sm:text-3xl font-bold leading-tight hover:text-amber-300 transition-colors cursor-pointer mb-3"
            >
              {opinionArticle.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3 mb-6">
              {opinionArticle.excerpt}
            </p>

            {opinionArticle.quote && (
              <blockquote className="p-4 rounded-xl bg-stone-800/60 border-r-2 border-amber-400 text-stone-200 text-xs sm:text-sm italic mb-6">
                "{opinionArticle.quote.text}"
              </blockquote>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <div className="flex items-center gap-3">
              <img
                src={opinionArticle.author.avatar}
                alt={opinionArticle.author.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/60"
              />
              <div>
                <span className="font-bold text-sm block">{opinionArticle.author.name}</span>
                <span className="text-[11px] text-stone-400 block">{opinionArticle.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlayAudio(opinionArticle)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                title="استمع للمقال"
              >
                <Headphones className="w-4 h-4 text-amber-400" />
              </button>
              <button
                onClick={() => onReadArticle(opinionArticle)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md"
              >
                <span>قراءة المقال</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: Infographic Numbers / أرقام العدد في سطور */}
      <div className="bg-stone-100 dark:bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            إنفوجرافيك أفق • أرقام العدد في سطور
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-center shadow-2xs">
            <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 block mb-1">
              +320B$
            </span>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-0.5">
              اقتصاد الذكاء الاصطناعي
            </span>
            <span className="text-[11px] text-stone-400">
              القيمة السوقية المتوقعة في الشرق الأوسط
            </span>
          </div>

          <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-center shadow-2xs">
            <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">
              90%
            </span>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-0.5">
              هندسة اجتماعية
            </span>
            <span className="text-[11px] text-stone-400">
              من حوادث الاختراق تستهدف العامل البشري
            </span>
          </div>

          <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-center shadow-2xs">
            <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">
              150+
            </span>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-0.5">
              تفقد يومي للشاشات
            </span>
            <span className="text-[11px] text-stone-400">
              متوسط فحص الهاتف للشخص العادي
            </span>
          </div>

          <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-center shadow-2xs">
            <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400 block mb-1">
              300M
            </span>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-0.5">
              عمر المجرات المرصودة
            </span>
            <span className="text-[11px] text-stone-400">
              سنة ضوئية فقط بعد الانفجار العظيم
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
