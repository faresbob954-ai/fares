import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Scale, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Watch, 
  Monitor,
  CheckCircle,
  FileCheck2,
  SlidersHorizontal,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useComparison } from '../context/ComparisonContext';
import { ProductCategory, Product } from '../types';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { popularComparisons } from '../data/comparisons';
import { buyingGuides } from '../data/articles';
import { ProductCard } from '../components/ProductCard';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';
import { PresentationExperience } from '../components/PresentationExperience';

interface HomeViewProps {
  onNavigate: (view: string, categoryFilter?: ProductCategory | 'all') => void;
  onSelectProduct: (productId: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onSelectArticle,
}) => {
  const { language, t, isRTL } = useLanguage();
  const { clearComparison, addProduct } = useComparison();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ProductCategory | 'all'>('all');

  // Featured and recently added products
  const featuredProducts = products.slice(0, 6);
  // Recently added (latest 4 devices in the registry)
  const recentlyAddedProducts = [...products].reverse().slice(0, 4);

  const handleLaunchComparisonPair = (productIds: string[]) => {
    clearComparison();
    productIds.forEach(id => addProduct(id));
    onNavigate('compare');
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigate('catalog');
    }
  };

  const categoryIconMap: Record<string, React.ReactNode> = {
    Smartphone: <Smartphone className="w-5 h-5 text-[#36BFFA]" />,
    Laptop: <Laptop className="w-5 h-5 text-[#635BFF]" />,
    Tablet: <Tablet className="w-5 h-5 text-[#36BFFA]" />,
    Headphones: <Headphones className="w-5 h-5 text-[#635BFF]" />,
    Watch: <Watch className="w-5 h-5 text-[#36BFFA]" />,
    Monitor: <Monitor className="w-5 h-5 text-[#635BFF]" />,
  };

  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nexora',
    alternateName: 'نيكسورا',
    description: language === 'ar' ? 'منصة مستقلة لمقارنة المواصفات التقنية للأجهزة الإلكترونية بدقة' : 'Objective side-by-side technical specification comparisons for consumer electronics.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nexora.org/catalog?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      <SEOMeta
        title={t('heroTitle')}
        description={t('heroSubtitle')}
        schemaData={schemaWebsite}
      />

      {/* ======================================================== */}
      {/* 1. CLEAN MINIMALIST HERO SECTION                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F7FF] py-16 sm:py-24 rounded-3xl mx-3 sm:mx-6 lg:mx-8 px-6 sm:px-12 border border-[#E8EAF0] dark:border-[#2A2E39] shadow-sm">
        {/* Subtle low-opacity gradient background movement */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#635BFF]/5 dark:bg-[#635BFF]/10 rounded-full blur-3xl pointer-events-none animate-nexora-soft-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#36BFFA]/5 dark:bg-[#36BFFA]/10 rounded-full blur-3xl pointer-events-none animate-nexora-soft-pulse" />
        
        {/* Spare geometric outline shapes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="25%" r="48" stroke="#635BFF" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <circle cx="90%" cy="75%" r="64" stroke="#36BFFA" strokeWidth="1" strokeDasharray="6 6" fill="none" />
          <rect x="85%" y="18%" width="28" height="28" rx="8" stroke="#635BFF" strokeWidth="1" fill="none" />
        </svg>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle Technology Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F8FC] dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] text-xs font-semibold text-[#171923] dark:text-[#F5F7FF] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#36BFFA]" />
            <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent font-bold">
              {t('heroBadge')}
            </span>
          </div>

          {/* Heading - Exact requirement: "Compare Smarter. Choose Better." */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#171923] dark:text-[#F5F7FF] leading-tight animate-nexora-fade-up">
            {language === 'ar' ? (
              <>
                قارن بذكاء. <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent">اختر باحترافية.</span>
              </>
            ) : (
              <>
                Compare Smarter.{' '}
                <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent">
                  Choose Better.
                </span>
              </>
            )}
          </h1>

          {/* Short supporting description */}
          <p className="text-sm sm:text-base text-[#687083] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Prominent, elegant search bar */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="relative max-w-2xl mx-auto mt-8 flex items-center rounded-2xl p-1.5 bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] shadow-sm hover:border-[#635BFF]/40 focus-within:border-[#635BFF] focus-within:ring-4 focus-within:ring-[#635BFF]/10 transition-all duration-200"
          >
            <div className="relative flex-1 flex items-center">
              <Search className={`w-5 h-5 text-[#635BFF] dark:text-[#36BFFA] absolute ${isRTL ? 'right-3.5' : 'left-3.5'} pointer-events-none transition-transform duration-200`} />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={t('heroSearchPlaceholder')}
                className={`w-full py-3 text-sm text-[#171923] dark:text-[#F5F7FF] placeholder:text-[#687083] dark:placeholder:text-slate-400 bg-transparent focus:outline-none ${
                  isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
                }`}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] hover:opacity-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs active:scale-98 shrink-0 cursor-pointer"
            >
              {t('navSearchShort')}
            </button>
          </form>

          {/* Clear calls to action for comparing products */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('compare')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] hover:opacity-95 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <Scale className="w-4 h-4" />
              <span>{t('heroCompareCta')}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('catalog', 'all')}
              className="inline-flex items-center gap-2 bg-[#F7F8FC] dark:bg-[#191C24] hover:bg-slate-100 dark:hover:bg-[#20242E] text-[#171923] dark:text-slate-200 font-semibold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/40 transition-all cursor-pointer"
            >
              <span>{t('heroBrowseCta')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Stats Highlights */}
          <div className="pt-6 border-t border-[#E8EAF0] dark:border-[#2A2E39] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#635BFF] font-mono">6</div>
              <div className="text-[11px] text-[#687083] dark:text-slate-400 mt-0.5">{language === 'ar' ? 'فئات إلكترونيات رئيسية' : 'Major Categories'}</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#36BFFA] font-mono">100+</div>
              <div className="text-[11px] text-[#687083] dark:text-slate-400 mt-0.5">{language === 'ar' ? 'مواصفة تقنية مدققة' : 'Audited Specifications'}</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#635BFF] font-mono">100%</div>
              <div className="text-[11px] text-[#687083] dark:text-slate-400 mt-0.5">{language === 'ar' ? 'تحليل عتادي محايد' : 'Unbiased Hardware Data'}</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#36BFFA] font-mono">Side-by-Side</div>
              <div className="text-[11px] text-[#687083] dark:text-slate-400 mt-0.5">{language === 'ar' ? 'مقارنة فروق مباشرة' : 'Instant Spec Delta'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. ADVANCED PRESENTATION EXPERIENCE SHOWCASE             */}
      {/* ======================================================== */}
      <PresentationExperience
        onNavigate={onNavigate}
        onLaunchComparisonPair={handleLaunchComparisonPair}
        onSelectProduct={onSelectProduct}
      />

      {/* Top Configured Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdPlacement format="leaderboard" />
      </div>

      {/* ======================================================== */}
      {/* 2. POPULAR CATEGORIES                                    */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تصفح حسب الفئة' : 'Browse by Category'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {t('popularCategoriesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
              {t('popularCategoriesSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog', 'all')}
            className="text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('viewCategoryProducts')}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate('catalog', cat.id)}
                className="group p-4 sm:p-5 bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/50 hover:shadow-md transition-all duration-200 text-left rtl:text-right flex flex-col justify-between hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] group-hover:border-[#635BFF]/30 transition-colors w-fit mb-3">
                  {categoryIconMap[cat.iconName]}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] transition-colors">
                    {language === 'ar' ? cat.nameAr : cat.nameEn}
                  </h3>
                  <p className="text-[11px] text-[#687083] dark:text-slate-400 mt-0.5">
                    {count} {language === 'ar' ? 'أجهزة' : 'devices'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED PRODUCT COMPARISON CARDS                     */}
      {/* Covers phones, laptops, tablets, headphones,             */}
      {/* smartwatches, and monitors per prompt specification      */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مواجهات مباشرة' : 'Head-to-Head Showdowns'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
            {t('popularComparisonsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
            {t('popularComparisonsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularComparisons.map((item) => {
            const p1 = products.find(p => p.id === item.productIds[0]);
            const p2 = products.find(p => p.id === item.productIds[1]);
            if (!p1 || !p2) return null;

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-6 shadow-xs hover:border-[#635BFF]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-4">
                    <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10">
                      {item.category}
                    </span>
                    <span className="text-[#687083] dark:text-slate-400 font-mono text-[10px]">
                      Matchup Analysis
                    </span>
                  </div>

                  {/* Device vs Device Preview */}
                  <div className="grid grid-cols-5 items-center gap-2 mb-4 bg-[#F7F8FC] dark:bg-[#111318] p-3 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                    <div className="col-span-2 text-center space-y-1.5">
                      <img
                        src={p1.imageUrl}
                        alt={p1.model}
                        className="w-16 h-16 object-cover mx-auto rounded-xl bg-white dark:bg-slate-800 border border-[#E8EAF0] dark:border-slate-700"
                      />
                      <p className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] truncate">
                        {p1.model}
                      </p>
                    </div>

                    <div className="col-span-1 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white font-black text-[11px] shadow-xs">
                        {t('vsText')}
                      </span>
                    </div>

                    <div className="col-span-2 text-center space-y-1.5">
                      <img
                        src={p2.imageUrl}
                        alt={p2.model}
                        className="w-16 h-16 object-cover mx-auto rounded-xl bg-white dark:bg-slate-800 border border-[#E8EAF0] dark:border-slate-700"
                      />
                      <p className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] truncate">
                        {p2.model}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                    {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchComparisonPair(item.productIds)}
                  className="w-full py-2.5 px-4 bg-[#171923] dark:bg-[#111318] hover:bg-gradient-to-r hover:from-[#635BFF] hover:to-[#36BFFA] text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-[#171923] dark:border-slate-700 hover:border-transparent cursor-pointer active:scale-98 shadow-xs"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{t('compareNow')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FEATURED PRODUCTS SECTION                             */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'أبرز الأجهزة' : 'Flagship Hardware'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {t('featuredTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
              {t('featuredSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog', 'all')}
            className="text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('viewAllProducts')}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. RECENTLY ADDED PRODUCTS SECTION                       */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#36BFFA] uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحديثات حديثة' : 'Latest Registry Additions'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {t('recentlyAddedTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
              {t('recentlyAddedSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog', 'all')}
            className="text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('viewAllProducts')}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentlyAddedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. HOW NEXORA WORKS (3 STEPS)                            */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F8FC] dark:bg-[#191C24] rounded-3xl p-8 sm:p-12 border border-[#E8EAF0] dark:border-[#2A2E39] space-y-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'منهجية العمل' : 'Evaluation Architecture'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8]">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#111318] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 hover:border-[#635BFF]/40 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#36BFFA] text-white font-black flex items-center justify-center text-sm shadow-xs">
                1
              </div>
              <h3 className="font-extrabold text-[#171923] dark:text-[#F5F7FF] text-sm">
                {t('step1Title')}
              </h3>
              <p className="text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111318] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 hover:border-[#635BFF]/40 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#36BFFA] text-white font-black flex items-center justify-center text-sm shadow-xs">
                2
              </div>
              <h3 className="font-extrabold text-[#171923] dark:text-[#F5F7FF] text-sm">
                {t('step2Title')}
              </h3>
              <p className="text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111318] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 hover:border-[#635BFF]/40 transition-colors shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#36BFFA] text-white font-black flex items-center justify-center text-sm shadow-xs">
                3
              </div>
              <h3 className="font-extrabold text-[#171923] dark:text-[#F5F7FF] text-sm">
                {t('step3Title')}
              </h3>
              <p className="text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. USEFUL BUYING GUIDES & LATEST ARTICLES               */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'أدلة فنية متخصصة' : 'Engineering Buying Guides'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {t('guidesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
              {t('guidesSubtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('articles')}
            className="text-xs font-bold text-[#635BFF] dark:text-[#36BFFA] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{language === 'ar' ? 'عرض جميع الأدلة' : 'View All Guides'}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyingGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => onSelectArticle(guide.id)}
              className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-6 flex flex-col justify-between hover:border-[#635BFF]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#687083] dark:text-slate-400">
                  <span className="uppercase font-mono font-semibold text-[#635BFF] dark:text-[#36BFFA]">{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTimeMinutes} {t('minRead')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.publishedDate}</span>
                </div>

                <h3 className="font-bold text-base text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] transition-colors leading-snug">
                  {language === 'ar' ? guide.titleAr : guide.titleEn}
                </h3>

                <p className="text-xs text-[#687083] dark:text-[#94A3B8] line-clamp-3 leading-relaxed">
                  {language === 'ar' ? guide.excerptAr : guide.excerptEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-between text-xs font-bold text-[#635BFF] dark:text-[#36BFFA]">
                <span>{t('readFullGuide')}</span>
                {isRTL ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. TRUST, METHODOLOGY & TRANSPARENCY                    */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-10 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-[#171923] dark:text-[#F5F7FF]">
            <div className="w-9 h-9 rounded-xl bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF] dark:text-[#36BFFA]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
            </div>
            <h2 className="text-lg font-extrabold">
              {t('trustTitle')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
            {t('trustP1')}
          </p>
          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
            {t('trustP2')}
          </p>
          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
            {t('trustP3')}
          </p>
        </div>
      </section>

    </div>
  );
};
