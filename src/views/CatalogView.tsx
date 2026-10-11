import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCcw, 
  Filter, 
  SlidersHorizontal,
  X,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategory, Product } from '../types';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';

interface CatalogViewProps {
  initialCategory?: ProductCategory | 'all';
  onSelectProduct: (productId: string) => void;
  onNavigateCompare: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onNavigateCompare
}) => {
  const { language, t, isRTL } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'year-desc'>('year-desc');
  const [displayCount, setDisplayCount] = useState<number>(9);

  // Available brands in the entire catalog or filtered category
  const availableBrands = useMemo(() => {
    const list = selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);
    return Array.from(new Set(list.map(p => p.brand))).sort();
  }, [selectedCategory]);

  // Toggle brand
  const handleToggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(3000);
    setSortBy('year-desc');
    setDisplayCount(9);
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.model.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = (language === 'ar' ? product.descriptionAr : product.descriptionEn).toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price
      const basePrice = product.prices[0]?.price || 0;
      if (basePrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.prices[0]?.price || 0;
      const priceB = b.prices[0]?.price || 0;

      switch (sortBy) {
        case 'name-asc':
          return a.model.localeCompare(b.model);
        case 'name-desc':
          return b.model.localeCompare(a.model);
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'year-desc':
        default:
          return b.releaseYear - a.releaseYear;
      }
    });
  }, [searchQuery, selectedCategory, selectedBrands, maxPrice, sortBy, language]);

  const visibleProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedBrands.length > 0 ||
    maxPrice < 3000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={t('catalogTitle')}
        description={t('catalogSubtitle')}
      />

      {/* Catalog Title Banner */}
      <div className="border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171923] dark:text-[#F5F7FF] tracking-tight">
          {t('catalogTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] mt-1">
          {t('catalogSubtitle')}
        </p>
      </div>

      {/* Filter and Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-5 space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAF0] dark:border-[#2A2E39]">
              <div className="flex items-center gap-2 text-[#171923] dark:text-[#F5F7FF] font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[#635BFF] dark:text-[#36BFFA] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('clearFilters')}</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171923] dark:text-slate-300 block">
                {t('filterSearch')}
              </label>
              <div className="relative">
                <Search className={`w-3.5 h-3.5 text-[#687083] dark:text-slate-400 absolute top-2.5 ${isRTL ? 'right-2.5' : 'left-2.5'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. OLED, Snapdragon, M4..."
                  className={`w-full py-1.5 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] text-[#171923] dark:text-slate-200 ${
                    isRTL ? 'pr-8 pl-2 text-right' : 'pl-8 pr-2 text-left'
                  }`}
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171923] dark:text-slate-300 block">
                {t('filterCategory')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as any);
                  setSelectedBrands([]);
                }}
                className="w-full py-1.5 px-2.5 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] text-[#171923] dark:text-slate-200"
              >
                <option value="all">{t('catAll')}</option>
                <option value="smartphones">{t('catSmartphones')}</option>
                <option value="laptops">{t('catLaptops')}</option>
                <option value="tablets">{t('catTablets')}</option>
                <option value="headphones">{t('catHeadphones')}</option>
                <option value="smartwatches">{t('catSmartwatches')}</option>
                <option value="monitors">{t('catMonitors')}</option>
              </select>
            </div>

            {/* Brand Checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171923] dark:text-slate-300 block">
                {t('filterBrand')}
              </label>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleToggleBrand(brand)}
                      className="rounded border-[#E8EAF0] dark:border-[#2A2E39] text-[#635BFF] focus:ring-[#635BFF] w-3.5 h-3.5"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Reference Price Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E8EAF0] dark:border-[#2A2E39]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171923] dark:text-slate-300">{t('filterPriceRange')}</span>
                <span className="font-mono text-[#635BFF] dark:text-[#36BFFA] font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={300}
                max={3000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#635BFF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#687083] dark:text-slate-400 font-mono">
                <span>$300</span>
                <span>$3,000+</span>
              </div>
            </div>

          </div>

          {/* Configured Sidebar Ad */}
          <AdPlacement format="sidebar" />
        </aside>

        {/* Right Column: Catalog Grid & Sorting */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Header Controls: Results Count & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#191C24] p-3.5 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs">
            <div className="text-xs font-semibold text-[#687083] dark:text-slate-400">
              {t('showingResults', { count: filteredProducts.length })}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label className="text-xs text-[#687083] dark:text-slate-400 whitespace-nowrap font-medium">
                {t('sortBy')}:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1 px-2.5 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] font-medium text-[#171923] dark:text-slate-200"
              >
                <option value="year-desc">{t('sortYearDesc')}</option>
                <option value="name-asc">{t('sortNameAsc')}</option>
                <option value="name-desc">{t('sortNameDesc')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F8FC] dark:bg-[#111318] flex items-center justify-center mx-auto text-[#687083] dark:text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] dark:text-[#F5F7FF]">
                {t('noResultsTitle')}
              </h3>
              <p className="text-xs text-[#687083] dark:text-slate-400 max-w-md mx-auto">
                {t('noResultsDesc')}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white rounded-xl text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="px-6 py-2.5 bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF] text-[#171923] dark:text-[#F5F7FF] text-xs font-bold rounded-xl shadow-2xs hover:bg-[#F7F8FC] dark:hover:bg-[#111318] transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'تحميل المزيد من الأجهزة' : 'Load More Devices'}
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
