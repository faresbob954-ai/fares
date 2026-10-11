import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, BookOpen, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buyingGuides } from '../data/articles';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
  onNavigateCatalogCategory: (category: any) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  articleId,
  onBack,
  onNavigateCatalogCategory
}) => {
  const { language, t, isRTL } = useLanguage();
  const article = buyingGuides.find(a => a.id === articleId) || buyingGuides[0];

  const content = language === 'ar' ? article.contentAr : article.contentEn;
  const title = language === 'ar' ? article.titleAr : article.titleEn;
  const author = language === 'ar' ? article.authorAr : article.authorEn;

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: language === 'ar' ? article.excerptAr : article.excerptEn,
    author: {
      '@type': 'Organization',
      name: author
    },
    datePublished: article.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Nexora'
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={title}
        description={language === 'ar' ? article.excerptAr : article.excerptEn}
        type="article"
        schemaData={schemaArticle}
      />

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{language === 'ar' ? 'الرجوع إلى الأدلة والمقالات' : 'Back to Buying Guides'}</span>
      </button>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
          <span className="uppercase text-cyan-700 font-bold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTimeMinutes} {t('minRead')}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-600" />
            <span>{author}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-600">
            Educational Architecture Series
          </span>
        </div>
      </header>

      {/* Article Body */}
      <article className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        {/* Intro */}
        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200">
          {content.intro}
        </p>

        {/* Ad Placement */}
        <AdPlacement format="leaderboard" />

        {/* Main Sections */}
        {content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {sec.heading}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {sec.body}
            </p>
          </section>
        ))}

        {/* Verdict Callout */}
        <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-6 space-y-2 mt-8">
          <h3 className="font-bold text-sm text-cyan-900 uppercase tracking-wider">
            {language === 'ar' ? 'الخلاصة والتوصية الهندسية' : 'Engineering Verdict & Recommendation'}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-950 font-medium leading-relaxed">
            {content.verdict}
          </p>
        </div>
      </article>

      {/* Action Footer */}
      <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigateCatalogCategory(article.category)}
          className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold transition-colors"
        >
          {language === 'ar' ? `استعراض أجهزة ${article.category} في الكتالوج` : `Compare ${article.category} in our catalog`}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 hover:underline"
        >
          {language === 'ar' ? 'جميع الأدلة التعليمية' : 'View All Hardware Guides'}
        </button>
      </div>

    </div>
  );
};
