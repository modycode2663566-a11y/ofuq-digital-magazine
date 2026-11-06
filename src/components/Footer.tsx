import React, { useState } from 'react';
import { Mail, Check, ArrowLeft, Heart, ShieldCheck, Award, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../data/mockArticles';

interface FooterProps {
  magazineTitle: string;
  magazineSubtitle: string;
  issueNumber: string;
  onSelectCategory: (catId: string) => void;
  onOpenPdfModal: () => void;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  magazineTitle,
  magazineSubtitle,
  issueNumber,
  onSelectCategory,
  onOpenPdfModal,
  onOpenEditor
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Newsletter Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 p-8 sm:p-10 border border-stone-800 mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/60 inline-block mb-3">
                النشرة البريدية الأسبوعية
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
                انضم لأكثر من 85,000 قارئ من نخب الفكر والتكنولوجيا
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 max-w-lg leading-relaxed">
                نرسل لك صباح كل سبت خلاصة أهم التحقيقات، المقالات الفلسفية، وقراءات الكتب الحصرية مباشرة إلى بريدك دون أي إعلانات مزعجة.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="أدخل بريدك الإلكتروني..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-stone-950/80 border border-stone-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                    <span>اشتراك مجاني</span>
                  </button>
                </div>
                {subscribed ? (
                  <p className="text-emerald-400 text-xs flex items-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>مرحباً بك في أسرة قراء {magazineTitle}! تم تسجيل بريدك بنجاح.</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-stone-500">
                    نحترم خصوصيتك التامة، ويمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Magazine Editorial Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800 text-xs sm:text-sm">
          
          {/* Col 1: Brand & Editorial Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-[10px] tracking-widest text-amber-500 font-bold uppercase block mb-1">
                مجلة ثقافية رقمية محكمة
              </span>
              <h2 className="font-editorial text-3xl font-bold text-white mb-2">
                {magazineTitle}
              </h2>
              <p className="text-stone-400 leading-relaxed text-xs">
                {magazineSubtitle}. منصة إعلامية عربية رائدة مكرسة لنشر الفكر النقدي، تحليلات الأمن السيبراني والذكاء الاصطناعي، ودراسات ريادة الأعمال الحديثة بأسلوب صحفي رفيع.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>جائزة الصحافة الرقمية 2025</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>محتوى مدقق وموثق</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4 pb-1 border-b border-stone-800">
              أبواب وأقسام المجلة
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400 flex items-center justify-between w-full"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-stone-600">تصفح ←</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial Board / هیئة التحرير */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4 pb-1 border-b border-stone-800">
              هيئة التحرير والاستشارات
            </h4>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li>
                <span className="text-white font-bold block">رئاسة التحرير:</span>
                <span>فريق تحرير {magazineTitle}</span>
              </li>
              <li>
                <span className="text-white font-bold block">التدقيق العلمي والتقني:</span>
                <span>نخبة من الأكاديميين وباحثي علوم البيانات</span>
              </li>
              <li>
                <span className="text-white font-bold block">الإصدار والترقيم:</span>
                <span>{issueNumber} • مسجلة كإصدار دوري رقمي</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Prototype & Quick Actions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4 pb-1 border-b border-stone-800">
              النسخة التجريبية
            </h4>
            <button
              onClick={onOpenEditor}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 p-2.5 rounded-xl text-xs text-center transition-colors cursor-pointer block border border-stone-700"
            >
              🛠️ استوديو التخصيص
            </button>
            <button
              onClick={onOpenPdfModal}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 p-2.5 rounded-xl text-xs text-center transition-colors cursor-pointer block border border-stone-700"
            >
              📄 تحميل نسخة PDF
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {magazineTitle}. تم تطوير هذا النموذج التفاعلي ليكون قابلاً للتعديل والتطوير.
          </p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>صُنع بشغف لخدمة المحتوى العربي الأصيل</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
