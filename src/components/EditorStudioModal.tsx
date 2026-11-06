import React, { useState } from 'react';
import { Article } from '../types/magazine';
import { 
  Wrench, 
  X, 
  Sparkles, 
  PlusCircle, 
  Edit3, 
  RotateCcw, 
  Check, 
  Layers, 
  Palette, 
  FileText,
  Sliders
} from 'lucide-react';
import { CATEGORIES } from '../data/mockArticles';

interface EditorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  magazineTitle: string;
  setMagazineTitle: (val: string) => void;
  magazineSubtitle: string;
  setMagazineSubtitle: (val: string) => void;
  issueNumber: string;
  setIssueNumber: (val: string) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onResetAll: () => void;
  onSetCoverStory: (id: string) => void;
}

export const EditorStudioModal: React.FC<EditorStudioModalProps> = ({
  isOpen,
  onClose,
  magazineTitle,
  setMagazineTitle,
  magazineSubtitle,
  setMagazineSubtitle,
  issueNumber,
  setIssueNumber,
  issueDate,
  setIssueDate,
  articles,
  onAddArticle,
  onUpdateArticle,
  onResetAll,
  onSetCoverStory
}) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'add' | 'edit'>('brand');
  const [successMsg, setSuccessMsg] = useState('');

  // Add Article Form State
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState('tech');
  const [newAuthor, setNewAuthor] = useState('');
  const [newReadTime, setNewReadTime] = useState('5 دقائق قراءة');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80');

  // Quick Article Presets
  const ARTICLE_PRESETS = [
    {
      title: 'اختراق خوارزميات التشفير: عندما تلتقي الحواسيب الكمومية بالأمن السيبراني',
      excerpt: 'تقرير حصري حول استعداد البنوك والمؤسسات الكبرى لعصر الحوسبة الكمومية والتشفير ما بعد الكمومي.',
      category: 'tech',
      author: 'مهندس سامي الباشا',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'فلسفة المكان الرقمي: كيف غيرت العوالم الافتراضية مفهومنا للمنزل والانتماء؟',
      excerpt: 'تأملات اجتماعية حول جيل يقضي 80% من يومه داخل بيئات حوسبة مكانية وشبكات رقمية مغلقة.',
      category: 'thought',
      author: 'د. نادية عبد العزيز',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'صناديق الثروة السيادية: رحلة توطين صناعات أشباه الموصلات في الشرق الأوسط',
      excerpt: 'تحليل اقتصادي لاستثمارات بمئات المليارات لبناء مصانع الرقائق فائقة الدقة وسلاسل الإمداد الوطنية.',
      category: 'business',
      author: 'طارق الزيات',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80'
    }
  ];

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof ARTICLE_PRESETS[0]) => {
    setNewTitle(preset.title);
    setNewExcerpt(preset.excerpt);
    setNewCategory(preset.category);
    setNewAuthor(preset.author);
    setNewImageUrl(preset.image);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Article = {
      id: 'art-' + Date.now(),
      title: newTitle.trim(),
      subtitle: 'مقال حصري مضاف مباشرة عبر لوحة التحرير السريع',
      excerpt: newExcerpt.trim() || 'ملخص المقال التحليلي الجديد في المجلة.',
      content: [
        newExcerpt.trim() || 'فقرة المقال الافتتاحية.',
        'هذا المقال تمت كتابته وإضافته مباشرة أثناء الجلسة التفاعلية لإثبات مرونة المنصة وسرعة تحديث المقالات دون الحاجة لإعادة البناء.',
        'يمكن تعديل نصوص هذه الفقرات وتنسيق الاقتباسات وإرفاق الرسوم البيانية بأريحية تامة.'
      ],
      category: newCategory,
      author: {
        id: 'auth-' + Date.now(),
        name: newAuthor.trim() || 'محرر تجريبي',
        role: 'كاتب ضيف / كاتب تحريري',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        bio: 'كاتب مشارك في استوديو التحرير التفاعلي لمجلة أفق.'
      },
      date: issueDate,
      readTime: newReadTime,
      coverImage: newImageUrl,
      tags: ['جديد', 'تحرير سريع', 'حصري'],
      views: 120,
      likes: 24,
      audioDuration: '3:20 دقيقة',
      comments: []
    };

    onAddArticle(created);
    setNewTitle('');
    setNewExcerpt('');
    setNewAuthor('');
    setSuccessMsg('🎉 تم إضافة المقال للمجلة بنجاح! يمكنك مشاهدته وقراءته فوراً.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Studio Top Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Wrench className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">استوديو التحرير والتخصيص السريع (Studio)</h3>
                <span className="text-[10px] bg-emerald-600 font-bold px-2 py-0.5 rounded-full text-white">
                  وضع العرض التجريبي
                </span>
              </div>
              <p className="text-xs text-stone-400">
                غيّر هوية المجلة، أضف مقالات على الهواء، أو عدّل قصة الغلاف لتريها لشريكك أو عميلك مباشرة.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 px-5 gap-2">
          <button
            onClick={() => setActiveTab('brand')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'brand'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>هوية المجلة والترويسة</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'add'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة مقال جديد فوراً</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'edit'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>إدارة قصة الغلاف والمقالات</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-stone-900 dark:text-stone-100">
          
          {/* Notification */}
          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2 border border-emerald-300 dark:border-emerald-800">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: BRAND IDENTITY */}
          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 mb-4">
                💡 <span className="font-bold">فكرة العرض للعميل:</span> اكتب هنا الاسم الذي يقترحه صديقك (مثلاً: "مجلة الرؤية"، "صوت التقنية"، "المجلة العلمية") وستتغير الترويسة بالكامل على الشاشة في نفس اللحظة!
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    اسم المجلة الرئيسي:
                  </label>
                  <input
                    type="text"
                    value={magazineTitle}
                    onChange={(e) => setMagazineTitle(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="مجلة أُفُقْ الرقمية"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    رقم العدد الحالي:
                  </label>
                  <input
                    type="text"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="العدد 48 - الإصدار الخاص"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                  شعار المجلة الفرعي / الوصف:
                </label>
                <input
                  type="text"
                  value={magazineSubtitle}
                  onChange={(e) => setMagazineSubtitle(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="المجلة العربية للتقنية والفكر والمستقبل"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                  تاريخ الصدور:
                </label>
                <input
                  type="text"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="نوفمبر 2026"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500">التحديث لحظي ومباشر في واجهة المجلة.</span>
                <button
                  onClick={() => {
                    setSuccessMsg('تم حفظ وتطبيق الهوية الجديدة بنجاح!');
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm"
                >
                  حفظ وتطبيق الهوية
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW ARTICLE */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateArticle} className="space-y-4">
              {/* Presets Row */}
              <div className="p-3 bg-stone-100 dark:bg-stone-800/70 rounded-2xl">
                <span className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  ⚡ نماذج جاهزة للإضافة بضغطة زر (Presets):
                </span>
                <div className="flex flex-wrap gap-2">
                  {ARTICLE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="text-xs bg-white dark:bg-stone-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      + {p.title.substring(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                  عنوان المقال:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: رحلة داخل مراكز البيانات الضخمة..."
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    القسم:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    اسم الكاتب:
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="مثال: د. حسام النجار"
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    زمن القراءة:
                  </label>
                  <input
                    type="text"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    placeholder="مثال: 4 دقائق قراءة"
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                  الموجز / المقتطف الافتتاحي:
                </label>
                <textarea
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="موجز شيق يلخص فكرة التحقيق للقارئ..."
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                  رابط صورة الغلاف:
                </label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة المقال للمجلة فوراً</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MANAGE EXISTING ARTICLES & COVER STORY */}
          {activeTab === 'edit' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 mb-2">
                اختر المقال الذي تريده ليكون "قصة الغلاف" الرئيسية للمجلة، أو عدّل عناوينه:
              </p>

              <div className="space-y-2">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={art.coverImage} alt={art.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm truncate">{art.title}</h4>
                        <span className="text-[11px] text-stone-400 block">{art.author.name} • {art.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {art.isCoverStory ? (
                        <span className="bg-amber-500 text-stone-950 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          ★ قصة الغلاف الحالية
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onSetCoverStory(art.id);
                            setSuccessMsg(`تم تعيين مقال "${art.title}" كقصة الغلاف الرئيسية!`);
                            setTimeout(() => setSuccessMsg(''), 3000);
                          }}
                          className="text-xs bg-stone-200 dark:bg-stone-700 hover:bg-amber-500 hover:text-stone-950 px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-medium"
                        >
                          اجعله قصة الغلاف
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer / Reset action */}
        <div className="p-4 bg-stone-100 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('هل تريد استعادة البيانات الافتراضية للمجلة؟')) {
                onResetAll();
                setSuccessMsg('تمت استعادة الإعدادات الأصلية بنجاح.');
                setTimeout(() => setSuccessMsg(''), 3000);
              }
            }}
            className="text-xs text-stone-500 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط المصنع (المجلة الأصلية)</span>
          </button>

          <button
            onClick={onClose}
            className="bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs px-5 py-2 rounded-xl cursor-pointer"
          >
            إغلاق ومتابعة التصفح
          </button>
        </div>

      </div>
    </div>
  );
};
