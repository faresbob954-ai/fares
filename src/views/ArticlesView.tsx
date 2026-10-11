import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, ArrowLeft, Filter, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../../server/db';
import { SEOMeta } from '../components/SEOMeta';
import { AdPlacement } from '../components/AdPlacement';

interface ArticlesViewProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ articles, onSelectArticle }) => {
  const { language, t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'en' | 'ar'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = articles.filter(art => {
    if (!art.isPublished) return false;
    if (selectedLanguage !== 'all' && art.language !== selectedLanguage) return false;
    if (selectedCategory !== 'all' && art.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={t('guidesTitle')}
        description={t('guidesSubtitle')}
      />

      {/* Header Banner */}
      <div className="border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#635BFF] dark:text-[#36BFFA] mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Nexora Knowledge Hub · 12 Original Peer-Reviewed Guides</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171923] dark:text-[#F5F7FF] tracking-tight">
          {t('guidesTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
          {t('guidesSubtitle')}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-[#191C24] p-4 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className={`w-3.5 h-3.5 text-[#687083] dark:text-slate-400 absolute top-2.5 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. OLED, SoC, Camera)..."
            className={`w-full py-1.5 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] text-[#171923] dark:text-slate-200 ${
              isRTL ? 'pr-8 pl-3 text-right' : 'pl-8 pr-3 text-left'
            }`}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Language filter */}
          <div className="flex items-center gap-1 bg-[#F7F8FC] dark:bg-[#111318] p-1 rounded-xl text-xs font-medium border border-[#E8EAF0] dark:border-[#2A2E39]">
            <button
              type="button"
              onClick={() => setSelectedLanguage('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedLanguage === 'all' ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white font-bold shadow-2xs' : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              All Languages
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedLanguage === 'en' ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white font-bold shadow-2xs' : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('ar')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedLanguage === 'ar' ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white font-bold shadow-2xs' : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl text-[#171923] dark:text-slate-200 focus:outline-none"
          >
            <option value="all">{t('catAll')}</option>
            <option value="smartphones">{t('catSmartphones')}</option>
            <option value="laptops">{t('catLaptops')}</option>
            <option value="monitors">{t('catMonitors')}</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.slug)}
              className="group bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                <div className="aspect-16/9 w-full bg-[#F7F8FC] dark:bg-[#111318] overflow-hidden relative border-b border-[#E8EAF0] dark:border-[#2A2E39]">
                  <img
                    src={article.featuredImageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono text-[#171923] dark:text-slate-200 bg-white/95 dark:bg-[#191C24]/95 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs uppercase">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#635BFF] dark:text-[#36BFFA] bg-white/95 dark:bg-[#191C24]/95 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs uppercase">
                      {article.language === 'ar' ? 'عربي' : 'EN'}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-[#687083] dark:text-slate-400">
                    <span>{article.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} {t('minRead')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h2 className="text-base font-bold text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#687083] dark:text-[#94A3B8] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-[#F7F8FC] dark:bg-[#111318] border-t border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-between text-xs font-semibold text-[#635BFF] dark:text-[#36BFFA]">
                <span>{t('readFullGuide')}</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-[#171923] dark:text-[#F5F7FF]">{t('noResultsTitle')}</p>
          <p className="text-xs text-[#687083] dark:text-slate-400">{t('noResultsDesc')}</p>
        </div>
      )}

      {/* Ad Placement */}
      <AdPlacement format="leaderboard" />
    </div>
  );
};
