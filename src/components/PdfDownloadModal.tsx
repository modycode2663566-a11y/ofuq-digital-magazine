import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle, Printer, Sparkles, BookOpen } from 'lucide-react';
import { Article } from '../types/magazine';

interface PdfDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  magazineTitle: string;
  issueNumber: string;
  issueDate: string;
  articles: Article[];
}

export const PdfDownloadModal: React.FC<PdfDownloadModalProps> = ({
  isOpen,
  onClose,
  magazineTitle,
  issueNumber,
  issueDate,
  articles
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  if (!isOpen) return null;

  const startDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setDownloadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setDownloading(false);
        setDownloadComplete(true);
      }
    }, 250);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 overflow-hidden">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
            النسخة المطبوعة والرقمية
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold mt-2 text-stone-900 dark:text-white">
            تحميل نسخة PDF الكاملة
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {magazineTitle} • {issueNumber} ({issueDate})
          </p>
        </div>

        {/* Magazine Cover Preview Card */}
        <div className="bg-stone-100 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative w-28 h-36 bg-stone-900 rounded-lg shadow-xl overflow-hidden border-2 border-amber-500/80 flex flex-col justify-between p-2.5 text-white shrink-0">
            <span className="text-[7px] text-amber-400 font-bold uppercase">{issueNumber}</span>
            <div className="my-auto text-center">
              <span className="font-editorial text-xs font-bold block">{magazineTitle}</span>
              <span className="text-[6px] text-stone-300 block line-clamp-2 mt-0.5">
                ملف الذكاء الاصطناعي والثغرات
              </span>
            </div>
            <div className="flex justify-between items-end border-t border-stone-700 pt-1">
              <span className="text-[6px] text-stone-400">{issueDate}</span>
              <span className="font-mono text-[6px]">||||||||||</span>
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-right">
            <h4 className="font-bold text-sm text-stone-900 dark:text-white mb-1">
              مواصفات الإصدار:
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <li>• عدد الصفحات: 48 صفحة ملونة بدقة عالية (300 DPI)</li>
              <li>• حجم الملف: 18.4 ميجابايت (PDF تفاعلي للطباعة والأجهزة اللوحية)</li>
              <li>• يتضمن كافة التحقيقات والمقالات والرسوم البيانية</li>
            </ul>
          </div>
        </div>

        {/* Download State */}
        {downloading ? (
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
              <span>جاري تجميع ومعالجة صفحات العدد...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        ) : downloadComplete ? (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
              تم تجهيز وتحميل ملف المجلة بنجاح!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
              جاهز للقراءة أوفلاين أو الإرسال للشريك والعملاء.
            </p>
          </div>
        ) : null}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={startDownload}
            disabled={downloading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloadComplete ? 'إعادة تحميل الملف' : 'بدء تحميل نسخة PDF الآن'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة</span>
          </button>
        </div>

      </div>
    </div>
  );
};
