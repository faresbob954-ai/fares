import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Calendar, 
  Clock, 
  Share2, 
  ShieldCheck, 
  Bookmark,
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../../server/db';
import { SEOMeta } from '../components/SEOMeta';
import { AdPlacement } from '../components/AdPlacement';

interface SingleArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SingleArticleView: React.FC<SingleArticleViewProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle
}) => {
  const { language, t, isRTL } = useLanguage();

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImageUrl,
    author: {
      '@type': 'Organization',
      name: article.author
    },
    datePublished: article.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Nexora',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexora.org/logo.png'
      }
    }
  };

  // Convert basic markdown headings (##, ###) into formatted HTML blocks safely
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-bold text-cyan-950 mt-6 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(i => i.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-1.5 my-3 text-slate-700 text-sm">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
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
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        type="article"
        schemaData={schemaArticle}
      />

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-[#F5F7FF] transition-colors cursor-pointer"
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{language === 'ar' ? 'الرجوع إلى جميع المقالات' : 'Back to Articles'}</span>
      </button>

      {/* Header */}
      <header className="space-y-4 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#687083] dark:text-slate-400 font-mono">
          <span className="uppercase text-[#635BFF] dark:text-[#36BFFA] font-bold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTimeMinutes} {t('minRead')}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span className="font-bold text-[#171923] dark:text-[#F5F7FF]">{article.language === 'ar' ? 'العربية' : 'English'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171923] dark:text-[#F5F7FF] tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#687083] dark:text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span className="font-medium text-[#171923] dark:text-[#F5F7FF]">{article.author}</span>
          </div>

          <div className="flex items-center gap-2 text-[#687083] dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Factual Hardware Documentation</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="aspect-16/9 w-full bg-[#F7F8FC] dark:bg-[#111318] rounded-2xl overflow-hidden border border-[#E8EAF0] dark:border-[#2A2E39]">
        <img
          src={article.featuredImageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Excerpt Lead */}
      <div className="p-5 bg-[#F7F8FC] dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] text-sm sm:text-base font-medium text-[#171923] dark:text-slate-200 leading-relaxed shadow-2xs">
        {article.excerpt}
      </div>

      {/* Affiliate Transparency Notice if present */}
      {article.hasAffiliateLinks && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>{t('affiliateDisclosureNotice')}</span>
        </div>
      )}

      {/* Formatted Article Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-[#171923] dark:text-slate-200">
        {renderFormattedContent(article.content)}
      </article>

      {/* Ad Placement */}
      <AdPlacement format="leaderboard" />

      {/* Related Content */}
      {relatedArticles.length > 0 && (
        <div className="pt-10 border-t border-[#E8EAF0] dark:border-[#2A2E39] space-y-4">
          <h3 className="text-base font-bold text-[#171923] dark:text-[#F5F7FF]">
            {language === 'ar' ? 'مقالات ذات صلة' : 'Related Hardware Guides'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.slug)}
                className="p-4 bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/50 hover:shadow-sm transition-all cursor-pointer flex gap-3 items-center group"
              >
                <img
                  src={rel.featuredImageUrl}
                  alt={rel.title}
                  className="w-16 h-16 rounded-xl object-cover bg-[#F7F8FC] dark:bg-[#111318] shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] transition-colors truncate">
                    {rel.title}
                  </p>
                  <p className="text-[11px] text-[#687083] dark:text-slate-400 mt-1">
                    {rel.readTimeMinutes} {t('minRead')} · {rel.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
