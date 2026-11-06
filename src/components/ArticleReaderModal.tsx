import React, { useState, useEffect } from 'react';
import { Article, ThemeMode, FontSize, Comment } from '../types/magazine';
import { 
  X, 
  Clock, 
  Bookmark, 
  Heart, 
  Share2, 
  Headphones, 
  MessageSquare, 
  Type, 
  Sun, 
  Moon, 
  BookOpen, 
  Send, 
  Check, 
  Play, 
  Pause,
  ArrowRight,
  Eye,
  Sparkles
} from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onLikeArticle: (id: string) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
  relatedArticles: Article[];
  onSelectRelated: (article: Article) => void;
  onPlayAudio: (article: Article) => void;
  isPlayingAudio: boolean;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onLikeArticle,
  onAddComment,
  relatedArticles,
  onSelectRelated,
  onPlayAudio,
  isPlayingAudio
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Comment Form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    // Reset liked state when article changes
    setLiked(false);
    setCommentSuccess(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  // Track scroll progress inside modal
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((target.scrollTop / totalHeight) * 100);
    }
  };

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLikeArticle(article.id);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: 'c-' + Date.now(),
      author: commentName.trim() || 'قارئ مجلة أفق',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      date: 'الآن',
      text: commentText.trim(),
      likes: 1
    };

    onAddComment(article.id, newComment);
    setCommentText('');
    setCommentName('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  // Styling based on themeMode
  const themeClasses = {
    light: 'bg-white text-stone-900',
    sepia: 'bg-[#fbf7ee] text-[#3e3428]',
    dark: 'bg-stone-950 text-stone-100'
  }[themeMode];

  const contentBorder = {
    light: 'border-stone-200',
    sepia: 'border-[#ebdcc5]',
    dark: 'border-stone-800'
  }[themeMode];

  const fontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    large: 'text-lg sm:text-xl leading-loose',
    huge: 'text-xl sm:text-2xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm animate-fade-in p-0 sm:p-4 md:p-6">
      
      {/* Modal Container */}
      <div 
        onScroll={handleScroll}
        className={`relative w-full h-full max-w-4xl max-h-[100vh] sm:max-h-[92vh] sm:rounded-3xl shadow-2xl overflow-y-auto ${themeClasses} transition-colors flex flex-col`}
      >
        {/* Top Reading Progress Bar */}
        <div 
          className="sticky top-0 left-0 right-0 h-1.5 bg-amber-500 z-50 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Floating Control Bar */}
        <div className={`sticky top-1.5 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b ${contentBorder} backdrop-blur-md ${
          themeMode === 'light' ? 'bg-white/90' : themeMode === 'sepia' ? 'bg-[#fbf7ee]/90' : 'bg-stone-950/90'
        }`}>
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-2.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمجلة</span>
          </button>

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Listen trigger */}
            <button
              onClick={() => onPlayAudio(article)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                isPlayingAudio 
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
              title="استمع للنسخة الصوتية"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isPlayingAudio ? 'جاري الاستماع' : 'استمع للمقال'}</span>
            </button>

            {/* Font size toggles */}
            <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded-full ${fontSize === 'normal' ? 'bg-amber-500 text-white font-bold' : ''}`}
                title="حجم خط عادي"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-full font-bold ${fontSize === 'large' ? 'bg-amber-500 text-white' : ''}`}
                title="خط كبير"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-2 py-0.5 rounded-full font-black ${fontSize === 'huge' ? 'bg-amber-500 text-white' : ''}`}
                title="خط عريض للقراءة المريحة"
              >
                A++
              </button>
            </div>

            {/* Theme modes (Light / Sepia / Dark) */}
            <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1.5 rounded-full ${themeMode === 'light' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
                title="الوضع النهاري"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('sepia')}
                className={`p-1.5 rounded-full font-bold text-xs ${themeMode === 'sepia' ? 'bg-[#ecd9ba] text-[#543d2b] shadow-xs' : 'text-stone-500'}`}
                title="نمط الورق الكلاسيكي (سيبيا)"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded-full ${themeMode === 'dark' ? 'bg-stone-800 text-stone-100 shadow-xs' : 'text-stone-500'}`}
                title="الوضع الليلي"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="px-5 sm:px-12 md:px-16 py-8 flex-1">
          
          {/* Header Metadata */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
              <span className="font-bold bg-amber-500/20 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full">
                تحقيق أفق
              </span>
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString('ar-EG')} قراءة
              </span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base sm:text-xl font-medium opacity-80 leading-relaxed mb-6 font-sans-ar">
                {article.subtitle}
              </p>
            )}

            {/* Author bar */}
            <div className={`flex items-center justify-between py-4 border-y ${contentBorder}`}>
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">{article.author.name}</h4>
                  <p className="text-xs opacity-70">{article.author.role}</p>
                </div>
              </div>

              {/* Interactions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    liked 
                      ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950 dark:border-rose-800' 
                      : 'border-stone-300 dark:border-stone-700 hover:border-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{(article.likes + (liked ? 1 : 0)).toLocaleString('ar-EG')}</span>
                </button>

                <button
                  onClick={() => onToggleBookmark(article.id)}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    isBookmarked 
                      ? 'bg-amber-500 text-stone-950 border-amber-400' 
                      : 'border-stone-300 dark:border-stone-700 hover:border-amber-400'
                  }`}
                  title={isBookmarked ? 'إلغاء الحفظ' : 'حفظ المقال'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:border-stone-400 transition-all cursor-pointer relative"
                  title="مشاركة المقال"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  {copiedLink && (
                    <span className="absolute -top-8 right-1/2 translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                      تم نسخ الرابط!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Full Cover Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full max-h-[460px] object-cover"
            />
            <div className="py-2 px-3 text-xs opacity-60 text-center">
              عدسة مجلة أفق • ملف العدد الحصري
            </div>
          </div>

          {/* Article Editorial Content Paragraphs */}
          <div className={`space-y-6 ${fontSizeClass} font-editorial`}>
            {/* Excerpt Lead */}
            <p className="font-semibold text-lg sm:text-2xl opacity-90 leading-relaxed font-sans-ar border-r-4 border-amber-500 pr-4 my-6">
              {article.excerpt}
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="tracking-wide">
                {paragraph}
              </p>
            ))}

            {/* Editorial Quote Callout */}
            {article.quote && (
              <div className="my-8 p-6 sm:p-8 rounded-2xl bg-amber-500/10 border-r-4 border-amber-600">
                <p className="text-xl sm:text-2xl font-bold italic mb-3 font-editorial leading-snug">
                  "{article.quote.text}"
                </p>
                <span className="block text-xs sm:text-sm font-bold opacity-75 font-sans-ar">
                  — {article.quote.author}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-dashed border-stone-300 dark:border-stone-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold opacity-60">الوسوم:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-medium hover:bg-amber-500/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Extended Bio Card */}
          {article.author.bio && (
            <div className={`my-10 p-6 rounded-2xl border ${contentBorder} bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right`}>
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shrink-0"
              />
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block mb-1">
                  عن كاتب المقال
                </span>
                <h4 className="font-bold text-lg mb-1">{article.author.name}</h4>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans-ar">
                  {article.author.bio}
                </p>
              </div>
            </div>
          )}

          {/* Interactive Comments Section */}
          <section className={`mt-12 pt-8 border-t ${contentBorder}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <span>تعليقات القراء ({article.comments.length})</span>
              </h3>
            </div>

            {/* Post comment form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
              <h4 className="font-bold text-sm mb-3">شارك برأيك في هذا المقال:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="اسمك أو صفتك..."
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <textarea
                rows={3}
                placeholder="أضف تعليقك أو وجهة نظرك هنا..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3"
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">نرحب بالحوار الفكري البناء</span>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال التعليق</span>
                </button>
              </div>

              {commentSuccess && (
                <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>تم نشر تعليقك بنجاح وسيكون متاحاً لجميع قراء المجلة!</span>
                </div>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {article.comments.length === 0 ? (
                <p className="text-center py-6 text-sm opacity-60">كن أول من يعلق على هذا المقال!</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {comment.avatar ? (
                          <img src={comment.avatar} alt={comment.author} className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                            {comment.author.charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-xs sm:text-sm">{comment.author}</span>
                      </div>
                      <span className="text-[11px] opacity-60">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-sans-ar">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Related Articles Carousel / Grid */}
          {relatedArticles.length > 0 && (
            <section className={`mt-14 pt-8 border-t ${contentBorder}`}>
              <h3 className="font-bold text-xl mb-4 font-editorial">مقالات أخرى قد تهمك في هذا العدد:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 transition-all cursor-pointer flex gap-3 group bg-black/5 dark:bg-white/5"
                  >
                    <img src={rel.coverImage} alt={rel.title} className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 block mb-1">{rel.author.name}</span>
                      <h4 className="font-editorial font-bold text-sm group-hover:text-amber-500 line-clamp-2 transition-colors">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] opacity-60 block mt-1">{rel.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
};
