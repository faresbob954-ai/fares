import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Globe, 
  Menu, 
  X, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Headphones, 
  Watch, 
  Monitor,
  ChevronDown,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useComparison } from '../context/ComparisonContext';
import { ProductCategory } from '../types';
import { products } from '../data/products';
import { NexoraLogo } from './NexoraLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onSelectProduct
}) => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { selectedProductIds } = useComparison();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(p =>
        p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (language === 'ar' ? p.descriptionAr : p.descriptionEn).toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleCategoryClick = (category: ProductCategory) => {
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('catalog', category);
  };

  const categoryItems: { id: ProductCategory; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'smartphones', labelKey: 'catSmartphones', icon: <Smartphone className="w-4 h-4 text-[#28D7F2]" /> },
    { id: 'laptops', labelKey: 'catLaptops', icon: <Laptop className="w-4 h-4 text-[#28D7F2]" /> },
    { id: 'tablets', labelKey: 'catTablets', icon: <Tablet className="w-4 h-4 text-[#28D7F2]" /> },
    { id: 'headphones', labelKey: 'catHeadphones', icon: <Headphones className="w-4 h-4 text-[#28D7F2]" /> },
    { id: 'smartwatches', labelKey: 'catSmartwatches', icon: <Watch className="w-4 h-4 text-[#28D7F2]" /> },
    { id: 'monitors', labelKey: 'catMonitors', icon: <Monitor className="w-4 h-4 text-[#28D7F2]" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111318]/95 backdrop-blur-md border-b border-[#E8EAF0] dark:border-[#2A2E39] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand (Always links to homepage) */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
              aria-label="Nexora Home"
            >
              <NexoraLogo
                size="md"
                showWordmark={true}
                showTagline={true}
                taglineText={t('tagline')}
                theme={isDark ? 'dark' : 'light'}
              />
            </button>

            {/* Desktop Main Navigation */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[#171923] dark:text-slate-300">
              {/* 1. Home */}
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === 'home'
                    ? 'text-[#635BFF] dark:text-[#36BFFA] font-semibold bg-[#635BFF]/8 dark:bg-[#36BFFA]/10'
                    : 'text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24]'
                }`}
              >
                {t('navHome')}
              </button>

              {/* 2. Compare Products */}
              <button
                type="button"
                onClick={() => onNavigate('compare')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentView === 'compare'
                    ? 'text-[#635BFF] dark:text-[#36BFFA] font-semibold bg-[#635BFF]/8 dark:bg-[#36BFFA]/10'
                    : 'text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24]'
                }`}
              >
                <span>{t('navCompare')}</span>
                {selectedProductIds.length > 0 && (
                  <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                    {selectedProductIds.length}
                  </span>
                )}
              </button>

              {/* 3. Categories Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                  className="px-3 py-1.5 rounded-lg text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('navCategories')}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" />
                </button>

                {categoriesDropdownOpen && (
                  <div
                    className={`absolute top-full mt-1.5 w-56 bg-white dark:bg-[#191C24] rounded-xl shadow-xl border border-[#E8EAF0] dark:border-[#2A2E39] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                      isRTL ? 'right-0' : 'left-0'
                    }`}
                  >
                    {categoryItems.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left rtl:text-right px-3.5 py-2 text-xs flex items-center gap-2.5 text-[#171923] dark:text-slate-200 hover:bg-[#635BFF]/8 dark:hover:bg-[#36BFFA]/10 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                      >
                        {cat.icon}
                        <span className="font-medium">{t(cat.labelKey as any)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Articles */}
              <button
                type="button"
                onClick={() => onNavigate('articles')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === 'articles' || currentView === 'article'
                    ? 'text-[#635BFF] dark:text-[#36BFFA] font-semibold bg-[#635BFF]/8 dark:bg-[#36BFFA]/10'
                    : 'text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24]'
                }`}
              >
                {t('navArticles')}
              </button>

              {/* 5. Premium */}
              <button
                type="button"
                onClick={() => onNavigate('premium')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-semibold text-xs border cursor-pointer ${
                  currentView === 'premium'
                    ? 'bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white shadow-sm border-transparent'
                    : 'bg-[#635BFF]/8 hover:bg-[#635BFF]/12 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 border-[#635BFF]/20 hover:border-[#635BFF]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('navPremium')}</span>
              </button>

              {/* 6. About Us */}
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === 'about'
                    ? 'text-[#635BFF] dark:text-[#36BFFA] font-semibold bg-[#635BFF]/8 dark:bg-[#36BFFA]/10'
                    : 'text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24]'
                }`}
              >
                {t('navAboutUs')}
              </button>

              {/* 7. Contact */}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === 'contact'
                    ? 'text-[#635BFF] dark:text-[#36BFFA] font-semibold bg-[#635BFF]/8 dark:bg-[#36BFFA]/10'
                    : 'text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24]'
                }`}
              >
                {t('navContact')}
              </button>
            </nav>
          </div>

          {/* Search bar & Right actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Live Search Input with subtle animated focus */}
            <div className="relative hidden md:block w-36 lg:w-60 group">
              <div className="relative flex items-center">
                <Search className={`w-3.5 h-3.5 text-[#687083] group-focus-within:text-[#635BFF] dark:group-focus-within:text-[#36BFFA] absolute ${isRTL ? 'right-2.5' : 'left-2.5'} pointer-events-none transition-colors duration-200`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                  placeholder={t('navSearchPlaceholder')}
                  className={`w-full py-1.5 text-xs bg-[#F7F8FC] dark:bg-[#191C24] hover:bg-slate-100 dark:hover:bg-[#20242E] focus:bg-white dark:focus:bg-[#20242E] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] dark:focus:border-[#36BFFA] transition-all duration-200 text-[#171923] dark:text-[#F5F7FF] placeholder:text-[#687083] ${
                    isRTL ? 'pr-8 pl-2.5 text-right' : 'pl-8 pr-2.5 text-left'
                  }`}
                />
              </div>

              {/* Live Search Results Dropdown */}
              {searchFocused && searchQuery.trim() && (
                <div
                  className={`absolute top-full mt-1.5 w-80 bg-white dark:bg-[#191C24] rounded-xl shadow-xl border border-[#E8EAF0] dark:border-[#2A2E39] py-2 z-50 ${
                    isRTL ? 'left-0 text-right' : 'right-0 text-left'
                  }`}
                >
                  <div className="px-3 pb-1 text-[11px] font-semibold text-[#687083] uppercase tracking-wider">
                    {t('navSearchShort')}
                  </div>
                  {filteredSearchProducts.length > 0 ? (
                    filteredSearchProducts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          onSelectProduct(p.id);
                          setSearchQuery('');
                          setSearchFocused(false);
                        }}
                        className="w-full px-3 py-2 text-left rtl:text-right hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.model}
                          className="w-8 h-8 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#171923] dark:text-[#F5F7FF] truncate">
                            {p.model}
                          </p>
                          <p className="text-[11px] text-[#687083] dark:text-slate-400 truncate">
                            {p.brand} · {p.category}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-xs text-[#687083] dark:text-slate-400 text-center">
                      {t('noResultsTitle')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fully Functional Theme Toggle Button (Sun / Moon) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              title={isDark ? t('themeLight') : t('themeDark')}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#36BFFA] transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#635BFF] transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] text-xs font-semibold text-[#171923] dark:text-slate-300 hover:text-[#635BFF] dark:hover:text-[#36BFFA] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] transition-colors shadow-xs cursor-pointer active:scale-95"
              title={`Switch to ${language === 'en' ? 'العربية' : 'English'}`}
              aria-label={`Change language to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#635BFF] dark:text-[#36BFFA]" />
              <span>{t('navLanguage')}</span>
            </button>

            {/* Compare Quick Badge */}
            <button
              type="button"
              onClick={() => onNavigate('compare')}
              className="relative p-2 text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24] rounded-xl transition-colors cursor-pointer border border-[#E8EAF0] dark:border-[#2A2E39] shadow-xs active:scale-95"
              title={t('navCompare')}
              aria-label={t('navCompare')}
            >
              <Scale className="w-4 h-4" />
              {selectedProductIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {selectedProductIds.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#191C24] rounded-xl transition-colors cursor-pointer border border-[#E8EAF0] dark:border-[#2A2E39]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#111318] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-[#20242E] cursor-pointer"
            >
              {t('navHome')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('compare');
              }}
              className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-[#20242E] flex items-center justify-between cursor-pointer"
            >
              <span>{t('navCompare')}</span>
              {selectedProductIds.length > 0 && (
                <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {selectedProductIds.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('articles');
              }}
              className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-[#20242E] cursor-pointer"
            >
              {t('navArticles')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('premium');
              }}
              className="p-2.5 rounded-xl bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold text-left rtl:text-right border border-[#635BFF]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('navPremium')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-[#20242E] cursor-pointer"
            >
              {t('navAboutUs')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:bg-slate-100 dark:hover:bg-[#20242E] cursor-pointer"
            >
              {t('navContact')}
            </button>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#687083] uppercase tracking-wider mb-2">
              {t('navCategories')}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoryItems.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] hover:border-[#635BFF]/50 text-xs text-[#171923] dark:text-slate-200 cursor-pointer"
                >
                  {cat.icon}
                  <span>{t(cat.labelKey as any)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
