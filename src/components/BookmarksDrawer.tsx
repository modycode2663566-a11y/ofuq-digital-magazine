import React from 'react';
import { Article } from '../types/magazine';
import { X, Bookmark, Trash2, ArrowLeft, BookOpen } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onReadArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onReadArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 transition-transform animate-slide-in-right"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-lg text-stone-900 dark:text-white">
              المقالات المحفوظة ({bookmarkedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Bookmarks */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 dark:text-stone-200 mb-1">
                قائمتك فارغة حالياً
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                اضغط على أيقونة الحفظ (🔖) في أي مقال لتخزينه هنا والرجوع إليه لاحقاً بدون إنترنت أو تشتت.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 flex items-center gap-3 group hover:border-amber-400 transition-all"
              >
                <img
                  src={art.coverImage}
                  alt={art.title}
                  onClick={() => {
                    onReadArticle(art);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4
                    onClick={() => {
                      onReadArticle(art);
                      onClose();
                    }}
                    className="font-editorial font-bold text-sm text-stone-900 dark:text-white truncate cursor-pointer hover:text-amber-500 transition-colors"
                  >
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    بقلم: {art.author.name} • {art.readTime}
                  </p>
                  <button
                    onClick={() => {
                      onReadArticle(art);
                      onClose();
                    }}
                    className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1 hover:underline cursor-pointer"
                  >
                    <span>متابعة القراءة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                  title="حذف من المحفوظات"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>تفريغ كل المحفوظات</span>
            </button>
            <button
              onClick={onClose}
              className="bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
