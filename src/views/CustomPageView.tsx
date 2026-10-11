import React from 'react';
import { ArrowLeft, ArrowRight, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CustomPage } from '../../server/db';
import { SEOMeta } from '../components/SEOMeta';

interface CustomPageViewProps {
  page: CustomPage;
  onBack: () => void;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({ page, onBack }) => {
  const { language, isRTL } = useLanguage();

  const title = language === 'ar' && page.titleAr ? page.titleAr : page.titleEn;
  const content = language === 'ar' && page.contentAr ? page.contentAr : page.contentEn;

  // Format markdown-like headings and paragraphs safely
  const renderFormatted = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-bold text-cyan-900 mt-4 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed my-3">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={page.seoTitle || title}
        description={page.seoDescription || title}
      />

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{language === 'ar' ? 'الرجوع إلى الرئيسية' : 'Back to Home'}</span>
      </button>

      <header className="space-y-2 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <FileText className="w-4 h-4 text-cyan-600" />
          <span>Nexora Published Page · /{page.slug}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-4">
        {renderFormatted(content)}
      </div>
    </div>
  );
};
