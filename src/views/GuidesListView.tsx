import React from 'react';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buyingGuides } from '../data/articles';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';

interface GuidesListViewProps {
  onSelectArticle: (id: string) => void;
}

export const GuidesListView: React.FC<GuidesListViewProps> = ({ onSelectArticle }) => {
  const { language, t, isRTL } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={t('guidesTitle')}
        description={t('guidesSubtitle')}
      />

      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Educational Hardware Series</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('guidesTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('guidesSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {buyingGuides.map((guide) => (
          <article
            key={guide.id}
            onClick={() => onSelectArticle(guide.id)}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="uppercase font-mono text-cyan-700 font-semibold">{guide.category}</span>
                <span aria-hidden="true">·</span>
                <span>{guide.readTimeMinutes} {t('minRead')}</span>
                <span aria-hidden="true">·</span>
                <span>{guide.publishedDate}</span>
              </div>

              <h2 className="font-bold text-base text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                {language === 'ar' ? guide.titleAr : guide.titleEn}
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {language === 'ar' ? guide.excerptAr : guide.excerptEn}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700">
              <span>{t('readFullGuide')}</span>
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
            </div>
          </article>
        ))}
      </div>

      <AdPlacement format="leaderboard" />
    </div>
  );
};
