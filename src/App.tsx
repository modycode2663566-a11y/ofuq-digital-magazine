/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_ARTICLES, CATEGORIES } from './data/mockArticles';
import { Article, Comment } from './types/magazine';
import { Header } from './components/Header';
import { Navbar, ViewMode } from './components/Navbar';
import { CoverStoryHero } from './components/CoverStoryHero';
import { ArticleCard } from './components/ArticleCard';
import { EditorialSections } from './components/EditorialSections';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { EditorStudioModal } from './components/EditorStudioModal';
import { PdfDownloadModal } from './components/PdfDownloadModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, BookOpen, SearchX, Wrench } from 'lucide-react';

export default function App() {
  // Magazine Branding State
  const [magazineTitle, setMagazineTitle] = useState('مجلة أُفُقْ الرقمية');
  const [magazineSubtitle, setMagazineSubtitle] = useState('المجلة العربية للتقنية، الفكر، الأمن السيبراني والمستقبل');
  const [issueNumber, setIssueNumber] = useState('العدد 48 - الإصدار الخاص');
  const [issueDate, setIssueDate] = useState('نوفمبر 2026');

  // Articles & Content State
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('editorial');

  // Bookmarks & Likes State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-1', 'art-2']);

  // Modals & Drawers State
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [playingAudioArticle, setPlayingAudioArticle] = useState<Article | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Appearance & Styling State
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('amber');

  // Synchronize Dark Mode with HTML Root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Bookmarks Toggle
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle Likes
  const handleLikeArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );
  };

  // Handle Comments Add
  const handleAddComment = (articleId: string, newComment: Comment) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const updated = { ...art, comments: [newComment, ...art.comments] };
          if (activeArticle && activeArticle.id === articleId) {
            setActiveArticle(updated);
          }
          return updated;
        }
        return art;
      })
    );
  };

  // Add Article via Studio
  const handleAddArticle = (newArt: Article) => {
    setArticles((prev) => [newArt, ...prev]);
  };

  // Update Article
  const handleUpdateArticle = (updatedArt: Article) => {
    setArticles((prev) => prev.map((art) => (art.id === updatedArt.id ? updatedArt : art)));
  };

  // Set Cover Story
  const handleSetCoverStory = (targetId: string) => {
    setArticles((prev) =>
      prev.map((art) => ({
        ...art,
        isCoverStory: art.id === targetId
      }))
    );
  };

  // Reset to original data
  const handleResetAll = () => {
    setArticles(INITIAL_ARTICLES);
    setMagazineTitle('مجلة أُفُقْ الرقمية');
    setMagazineSubtitle('المجلة العربية للتقنية، الفكر، الأمن السيبراني والمستقبل');
    setIssueNumber('العدد 48 - الإصدار الخاص');
    setIssueDate('نوفمبر 2026');
  };

  // Share Article simulation
  const handleShareArticle = (article: Article) => {
    navigator.clipboard?.writeText(window.location.href);
    alert(`تم نسخ رابط مقال "${article.title}" إلى الحافظة لمشاركته!`);
  };

  // Category counts
  const articleCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach((art) => {
      counts[art.category] = (counts[art.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.author.name.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Cover Story Identification
  const coverStory = useMemo(() => {
    return articles.find((a) => a.isCoverStory) || articles[0];
  }, [articles]);

  // Articles without the cover story (when showing all)
  const nonCoverArticles = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery) {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.id !== coverStory?.id);
  }, [filteredArticles, selectedCategory, searchQuery, coverStory]);

  // Bookmarked Articles Objects
  const bookmarkedArticles = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  // Related articles for the modal reader
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles.filter(
      (a) => a.id !== activeArticle.id && (a.category === activeArticle.category || a.isTrending)
    );
  }, [articles, activeArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors selection:bg-amber-200 selection:text-amber-950">
      
      {/* Editorial Header */}
      <Header
        magazineTitle={magazineTitle}
        magazineSubtitle={magazineSubtitle}
        issueNumber={issueNumber}
        issueDate={issueDate}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        accentColor={accentColor}
        onChangeAccentColor={setAccentColor}
      />

      {/* Categories & Views Navbar */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        articleCounts={articleCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full space-y-12">
        
        {/* Search Results Notification Banner */}
        {searchQuery && (
          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
              نتائج البحث عن: <strong className="underline">"{searchQuery}"</strong> ({filteredArticles.length} موضوع)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-700 dark:text-amber-300 font-bold hover:underline cursor-pointer"
            >
              مسح البحث وعرض كل الأعداد
            </button>
          </div>
        )}

        {/* Hero Cover Story (Only shown on 'all' view without active search) */}
        {selectedCategory === 'all' && !searchQuery && coverStory && (
          <CoverStoryHero
            article={coverStory}
            onReadArticle={setActiveArticle}
            onPlayAudio={setPlayingAudioArticle}
            isBookmarked={bookmarkedIds.includes(coverStory.id)}
            onToggleBookmark={handleToggleBookmark}
            onShare={handleShareArticle}
            accentColor={accentColor}
          />
        )}

        {/* Articles List / Grid Display */}
        {nonCoverArticles.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
            <SearchX className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-1">
              لم نعثر على مقالات تطابق هذا المعيار
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-4">
              يمكنك مسح البحث، اختيار قسم آخر، أو الضغط على "استوديو التحرير" لإضافة مقال فوري لهذا القسم!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-amber-500 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
            >
              العودة لكافة المقالات
            </button>
          </div>
        ) : (
          <section>
            {/* Section Title */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-0.5">
                  ملف العدد المختار
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                  {selectedCategory === 'all' 
                    ? 'أبرز التحقيقات والمقالات المعاصرة' 
                    : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'المقالات'}
                </h3>
              </div>

              <span className="text-xs text-stone-500 font-medium">
                {nonCoverArticles.length} مادة منشورة
              </span>
            </div>

            {/* Layout based on viewMode */}
            {viewMode === 'editorial' && (
              <div className="space-y-6">
                {/* Horizontal featured top card */}
                {nonCoverArticles[0] && (
                  <ArticleCard
                    article={nonCoverArticles[0]}
                    onRead={setActiveArticle}
                    onPlayAudio={setPlayingAudioArticle}
                    isBookmarked={bookmarkedIds.includes(nonCoverArticles[0].id)}
                    onToggleBookmark={handleToggleBookmark}
                    variant="horizontal"
                  />
                )}

                {/* Remaining cards in 2/3 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {nonCoverArticles.slice(1).map((art) => (
                    <ArticleCard
                      key={art.id}
                      article={art}
                      onRead={setActiveArticle}
                      onPlayAudio={setPlayingAudioArticle}
                      isBookmarked={bookmarkedIds.includes(art.id)}
                      onToggleBookmark={handleToggleBookmark}
                      variant="card"
                    />
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonCoverArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onRead={setActiveArticle}
                    onPlayAudio={setPlayingAudioArticle}
                    isBookmarked={bookmarkedIds.includes(art.id)}
                    onToggleBookmark={handleToggleBookmark}
                    variant="card"
                  />
                ))}
              </div>
            )}

            {viewMode === 'compact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nonCoverArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onRead={setActiveArticle}
                    onPlayAudio={setPlayingAudioArticle}
                    isBookmarked={bookmarkedIds.includes(art.id)}
                    onToggleBookmark={handleToggleBookmark}
                    variant="compact"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Mid-Page Editorial Spotlight (Only shown on 'all' view) */}
        {selectedCategory === 'all' && !searchQuery && (
          <EditorialSections
            articles={articles}
            onReadArticle={setActiveArticle}
            onPlayAudio={setPlayingAudioArticle}
          />
        )}

        {/* Demo Presentation Floating Prompt Box ("عايز أهكرها ولا إيه") */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-white border border-emerald-800/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Wrench className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                أهكّر لك المجلة ولا نعدلها على ذوقك؟ (استوديو التعديل الفوري)
              </h4>
              <p className="text-xs text-emerald-200/80">
                يمكنك الآن تعديل اسم المجلة بالكامل، تغيير قصة الغلاف، أو كتابة موضوع جديد من الصفر وتجربته فوراً أمام زميلك!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all transform hover:scale-105 shadow-md shrink-0"
          >
            فتح استوديو التحرير والتعديل
          </button>
        </div>

      </main>

      {/* Floating Audio Player (When an article audio is active) */}
      <AudioPlayerBar
        article={playingAudioArticle}
        onClose={() => setPlayingAudioArticle(null)}
        onOpenArticle={(art) => setActiveArticle(art)}
      />

      {/* Full Interactive Article Reader Modal */}
      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onLikeArticle={handleLikeArticle}
        onAddComment={handleAddComment}
        relatedArticles={relatedArticles}
        onSelectRelated={setActiveArticle}
        onPlayAudio={(art) => setPlayingAudioArticle(art)}
        isPlayingAudio={playingAudioArticle?.id === activeArticle?.id}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onReadArticle={setActiveArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
      />

      {/* Editor & Customizer Studio Modal */}
      <EditorStudioModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        magazineTitle={magazineTitle}
        setMagazineTitle={setMagazineTitle}
        magazineSubtitle={magazineSubtitle}
        setMagazineSubtitle={setMagazineSubtitle}
        issueNumber={issueNumber}
        setIssueNumber={setIssueNumber}
        issueDate={issueDate}
        setIssueDate={setIssueDate}
        articles={articles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onResetAll={handleResetAll}
        onSetCoverStory={handleSetCoverStory}
      />

      {/* PDF Download Preview Modal */}
      <PdfDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        magazineTitle={magazineTitle}
        issueNumber={issueNumber}
        issueDate={issueDate}
        articles={articles}
      />

      {/* Editorial Footer */}
      <Footer
        magazineTitle={magazineTitle}
        magazineSubtitle={magazineSubtitle}
        issueNumber={issueNumber}
        onSelectCategory={setSelectedCategory}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

    </div>
  );
}
