import React from 'react';
import { CATEGORIES } from '../data/mockArticles';
import { LayoutGrid, Newspaper, List, Sparkles } from 'lucide-react';

export type ViewMode = 'editorial' | 'grid' | 'compact';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  articleCounts: Record<string, number>;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  articleCounts
}) => {
  return (
    <nav className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between gap-4 py-2 overflow-x-auto no-scrollbar">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = articleCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-800'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View Modes Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg border border-stone-200 dark:border-stone-700 shrink-0">
            <button
              onClick={() => onChangeViewMode('editorial')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="عرض صحفي تحريري"
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span className="text-[11px]">تحريري</span>
            </button>

            <button
              onClick={() => onChangeViewMode('grid')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="عرض البطاقات الشبكية"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px]">شبكي</span>
            </button>

            <button
              onClick={() => onChangeViewMode('compact')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="عرض القائمة السريعة"
            >
              <List className="w-3.5 h-3.5" />
              <span className="text-[11px]">موجز</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
