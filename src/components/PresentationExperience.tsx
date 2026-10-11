import React from 'react';
import { 
  Sparkles, 
  Scale, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  SlidersHorizontal, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Tablet, 
  Monitor,
  Cpu,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';

interface PresentationExperienceProps {
  onNavigate: (view: string, categoryFilter?: any) => void;
  onLaunchComparisonPair: (productIds: string[]) => void;
  onSelectProduct: (productId: string) => void;
}

export const PresentationExperience: React.FC<PresentationExperienceProps> = ({
  onNavigate,
  onLaunchComparisonPair,
  onSelectProduct,
}) => {
  const { language, t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  // Find actual products from the dataset for presentation cards
  const iphone = products.find(p => p.id === 'iphone-16-pro-max') || products[0];
  const samsung = products.find(p => p.id === 'samsung-s25-ultra') || products[1];
  const macbook = products.find(p => p.id === 'macbook-pro-m4-pro') || products[2];

  const handleLaunchPreviewCompare = () => {
    onLaunchComparisonPair(['iphone-16-pro-max', 'samsung-s25-ultra']);
  };

  const previewSpecs = [
    {
      labelEn: 'Silicon & Processor',
      labelAr: 'المعالج والسيليكون',
      val1En: 'Apple A18 Pro (3nm Gen 2)',
      val1Ar: 'Apple A18 Pro (معمارية 3 نانومتر)',
      val2En: 'Snapdragon 8 Elite (3nm Oryon)',
      val2Ar: 'Snapdragon 8 Elite (أنوية Oryon)',
      tagEn: 'Flagship 3nm',
      tagAr: 'معمارية 3 نانومتر'
    },
    {
      labelEn: 'Display & Peak Nit',
      labelAr: 'الشاشة والسطوع الأقصى',
      val1En: '6.9" ProMotion OLED (2,000 nits)',
      val1Ar: '6.9 بوصة ProMotion OLED (2000 شمعة)',
      val2En: '6.8" Dynamic AMOLED (2,600 nits)',
      val2Ar: '6.8 بوصة Dynamic AMOLED (2600 شمعة)',
      tagEn: '1-120Hz LTPO',
      tagAr: 'تردد متغير 1-120Hz'
    },
    {
      labelEn: 'Main Camera Sensor',
      labelAr: 'المستشعر الرئيسي للكاميرا',
      val1En: '48 MP Fusion (Sensor-shift OIS)',
      val1Ar: '48 ميجابكسل Fusion (تثبيت المستشعر)',
      val2En: '200 MP ISOCELL HP2 (f/1.7 OIS)',
      val2Ar: '200 ميجابكسل ISOCELL HP2 (f/1.7 OIS)',
      tagEn: 'Audited Sensor Delta',
      tagAr: 'فرق عتادي مدقق'
    },
    {
      labelEn: 'Chassis Material',
      labelAr: 'خامة الهيكل والإطار',
      val1En: 'Grade 5 Titanium & Ceramic Shield',
      val1Ar: 'تيتانيوم فئة 5 ودرع سيراميك',
      val2En: 'Titanium Frame & Gorilla Armor',
      val2Ar: 'إطار تيتانيوم وزجاج Gorilla Armor',
      tagEn: 'Aerospace Grade',
      tagAr: 'تيتانيوم فضائي'
    }
  ];

  const categoryChips = [
    { id: 'smartphones', labelEn: 'Smartphones', labelAr: 'هواتف ذكية', icon: <Smartphone className="w-3.5 h-3.5 text-[#36BFFA]" /> },
    { id: 'laptops', labelEn: 'Laptops', labelAr: 'حواسيب محمولة', icon: <Laptop className="w-3.5 h-3.5 text-[#635BFF]" /> },
    { id: 'tablets', labelEn: 'Tablets', labelAr: 'أجهزة لوحية', icon: <Tablet className="w-3.5 h-3.5 text-[#36BFFA]" /> },
    { id: 'headphones', labelEn: 'Headphones', labelAr: 'سماعات رأس', icon: <Headphones className="w-3.5 h-3.5 text-[#635BFF]" /> },
    { id: 'smartwatches', labelEn: 'Smartwatches', labelAr: 'ساعات ذكية', icon: <Watch className="w-3.5 h-3.5 text-[#36BFFA]" /> },
    { id: 'monitors', labelEn: 'Monitors', labelAr: 'شاشات عرض', icon: <Monitor className="w-3.5 h-3.5 text-[#635BFF]" /> },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] py-14 sm:py-20 rounded-3xl mx-3 sm:mx-6 lg:mx-8 px-6 sm:px-10 border border-[#E8EAF0] dark:border-[#2A2E39] shadow-sm transition-colors duration-200">
      
      {/* Background Animated Subtle Gradients & Geometric Accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#635BFF]/5 dark:bg-[#635BFF]/10 rounded-full blur-3xl pointer-events-none animate-nexora-soft-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#36BFFA]/5 dark:bg-[#36BFFA]/10 rounded-full blur-3xl pointer-events-none animate-nexora-soft-pulse" />
      
      {/* Abstract geometric wireframe background shapes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-15" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15%" cy="20%" r="55" stroke="#635BFF" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="85%" cy="80%" r="70" stroke="#36BFFA" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <rect x="80%" y="15%" width="32" height="32" rx="10" stroke="#635BFF" strokeWidth="1" fill="none" transform="rotate(15 80 15)" />
        <rect x="12%" y="78%" width="24" height="24" rx="6" stroke="#36BFFA" strokeWidth="1" fill="none" transform="rotate(45 12 78)" />
      </svg>

      <div className="relative max-w-6xl mx-auto space-y-14">
        
        {/* ========================================================= */}
        {/* TOP: HEADLINE, SUBTITLE & CALLS TO ACTION                */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-5 animate-nexora-fade-up">
          {/* Subtle Technology Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F8FC] dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] text-xs font-semibold text-[#171923] dark:text-[#F5F6FA] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#635BFF] dark:text-[#36BFFA]" />
            <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent font-bold">
              {t('presBadge')}
            </span>
          </div>

          {/* Large, Elegant Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171923] dark:text-[#F5F6FA] leading-tight">
            {language === 'ar' ? (
              <>
                نيكسورا —{' '}
                <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent">
                  الجيل المتطور
                </span>{' '}
                لمقارنة وتحليل الإلكترونيات
              </>
            ) : (
              <>
                Nexora —{' '}
                <span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent">
                  Next-Generation
                </span>{' '}
                Electronics Intelligence
              </>
            )}
          </h2>

          {/* Subtitle Explaining Supported Electronics Categories */}
          <p className="text-sm sm:text-base text-[#687083] dark:text-[#A5ADBD] leading-relaxed max-w-2xl mx-auto font-normal">
            {t('presSubtitle')}
          </p>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categoryChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => onNavigate('catalog', chip.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F8FC] dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/40 text-xs text-[#171923] dark:text-[#F5F6FA] transition-all hover:-translate-y-0.5 cursor-pointer shadow-2xs"
              >
                {chip.icon}
                <span>{language === 'ar' ? chip.labelAr : chip.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Two Prominent Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] hover:opacity-95 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <span>{t('presExploreCta')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('compare')}
              className="inline-flex items-center gap-2 bg-white dark:bg-[#191C24] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] text-[#171923] dark:text-[#F5F6FA] font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/50 transition-all active:scale-98 cursor-pointer shadow-2xs"
            >
              <Scale className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
              <span>{t('presCompareCta')}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VISUAL SHOWCASE: FLOATING LAYERED CARDS & COMPARISON PREVIEW */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Floating Layered Product Cards (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-4">
              
              {/* Layer 1: Front Primary Card (iPhone 16 Pro Max) */}
              <div 
                onClick={() => onSelectProduct(iphone.id)}
                className="group relative bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-4.5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer z-20"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7F8FC] dark:bg-[#111318] shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]">
                    <img 
                      src={iphone.imageUrl} 
                      alt={iphone.model} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-1 left-1 bg-white/90 dark:bg-[#191C24]/90 backdrop-blur-xs text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md text-[#635BFF] dark:text-[#36BFFA]">
                      2024
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#635BFF] uppercase tracking-wider">
                        {iphone.brand}
                      </span>
                      <span className="text-[10px] bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 px-2 py-0.5 rounded-full font-semibold">
                        A18 Pro · 3nm
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#171923] dark:text-[#F5F6FA] truncate">
                      {iphone.model}
                    </h3>
                    <p className="text-xs text-[#687083] dark:text-[#A5ADBD] mt-0.5 truncate">
                      Grade 5 Titanium · 6.9" ProMotion OLED · 48MP
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#687083] dark:text-[#A5ADBD] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] shrink-0 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Layer 2: Paired Secondary Card (Galaxy S25 Ultra) */}
              <div 
                onClick={() => onSelectProduct(samsung.id)}
                className="group relative bg-[#F7F8FC] dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-4.5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer z-10 sm:ms-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-[#111318] shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]">
                    <img 
                      src={samsung.imageUrl} 
                      alt={samsung.model} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-1 left-1 bg-white/90 dark:bg-[#191C24]/90 backdrop-blur-xs text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md text-[#36BFFA]">
                      2025
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#36BFFA] uppercase tracking-wider">
                        {samsung.brand}
                      </span>
                      <span className="text-[10px] bg-[#36BFFA]/10 text-[#36BFFA] px-2 py-0.5 rounded-full font-semibold">
                        Snapdragon 8 Elite
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#171923] dark:text-[#F5F6FA] truncate">
                      {samsung.model}
                    </h3>
                    <p className="text-xs text-[#687083] dark:text-[#A5ADBD] mt-0.5 truncate">
                      200MP Quad Camera · 6.8" AMOLED · Titanium
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#687083] dark:text-[#A5ADBD] group-hover:text-[#36BFFA] shrink-0 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Layer 3: Background Depth Card (MacBook Pro 14 M4 Pro) */}
              <div 
                onClick={() => onSelectProduct(macbook.id)}
                className="group relative bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-4 opacity-90 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer sm:ms-8 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F7F8FC] dark:bg-[#111318] shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]">
                    <img src={macbook.imageUrl} alt={macbook.model} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#635BFF] dark:text-[#36BFFA] uppercase">
                      {macbook.brand} · Pro Laptop
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#171923] dark:text-[#F5F6FA] truncate">
                      {macbook.model}
                    </h4>
                  </div>
                  <span className="text-[10px] text-[#687083] dark:text-[#A5ADBD] font-mono">
                    M4 Pro
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Comparison Preview Table (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-md p-5 sm:p-6 space-y-5">
              
              {/* Preview Header with Paired Mini Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8EAF0] dark:border-[#2A2E39] gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#635BFF] dark:text-[#36BFFA]">
                    <Scale className="w-3.5 h-3.5" />
                    <span>{t('presPreviewTitle')}</span>
                  </div>
                  <p className="text-xs text-[#687083] dark:text-[#A5ADBD] mt-0.5">
                    Direct hardware delta highlights between top tier flagships
                  </p>
                </div>
                
                <span className="self-start sm:self-auto text-[11px] font-semibold bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 px-2.5 py-1 rounded-full">
                  {t('presPreviewBadge')}
                </span>
              </div>

              {/* Devices Dual Header */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E8EAF0] dark:border-[#2A2E39]">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <img src={iphone.imageUrl} alt={iphone.model} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#171923] dark:text-[#F5F6FA] truncate">iPhone 16 Pro Max</div>
                    <div className="text-[10px] text-[#687083] dark:text-[#A5ADBD]">Apple</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <img src={samsung.imageUrl} alt={samsung.model} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#171923] dark:text-[#F5F6FA] truncate">Galaxy S25 Ultra</div>
                    <div className="text-[10px] text-[#687083] dark:text-[#A5ADBD]">Samsung</div>
                  </div>
                </div>
              </div>

              {/* Specification delta rows */}
              <div className="space-y-3">
                {previewSpecs.map((row, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] space-y-1.5 transition-colors hover:border-[#635BFF]/30"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#687083] dark:text-[#A5ADBD]">
                        {language === 'ar' ? row.labelAr : row.labelEn}
                      </span>
                      <span className="text-[10px] font-semibold text-[#635BFF] dark:text-[#36BFFA] bg-[#635BFF]/8 dark:bg-[#36BFFA]/10 px-2 py-0.5 rounded-full font-mono">
                        {language === 'ar' ? row.tagAr : row.tagEn}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="font-semibold text-[#171923] dark:text-[#F5F6FA]">
                        {language === 'ar' ? row.val1Ar : row.val1En}
                      </div>
                      <div className="font-semibold text-[#171923] dark:text-[#F5F6FA] border-s border-[#E8EAF0] dark:border-[#2A2E39] ps-3">
                        {language === 'ar' ? row.val2Ar : row.val2En}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button to open full comparison matrix */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLaunchPreviewCompare}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#36BFFA] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  <span>{t('presViewDetailedComparison')}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* THREE-STEP SECTION: DISCOVER -> COMPARE -> CHOOSE        */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-[#E8EAF0] dark:border-[#2A2E39]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Discover Products */}
            <div className="bg-[#F7F8FC] dark:bg-[#191C24] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-center text-[#635BFF] dark:text-[#36BFFA] shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#635BFF] dark:text-[#36BFFA]">01.</span>
                <h3 className="text-base font-extrabold text-[#171923] dark:text-[#F5F6FA]">
                  {t('presStep1Title')}
                </h3>
              </div>
              <p className="text-xs text-[#687083] dark:text-[#A5ADBD] leading-relaxed">
                {t('presStep1Desc')}
              </p>
            </div>

            {/* Step 2: Compare Specifications */}
            <div className="bg-[#F7F8FC] dark:bg-[#191C24] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-center text-[#36BFFA] shadow-2xs">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#36BFFA]">02.</span>
                <h3 className="text-base font-extrabold text-[#171923] dark:text-[#F5F6FA]">
                  {t('presStep2Title')}
                </h3>
              </div>
              <p className="text-xs text-[#687083] dark:text-[#A5ADBD] leading-relaxed">
                {t('presStep2Desc')}
              </p>
            </div>

            {/* Step 3: Choose Confidently */}
            <div className="bg-[#F7F8FC] dark:bg-[#191C24] p-6 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-center text-[#635BFF] dark:text-[#36BFFA] shadow-2xs">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#635BFF] dark:text-[#36BFFA]">03.</span>
                <h3 className="text-base font-extrabold text-[#171923] dark:text-[#F5F6FA]">
                  {t('presStep3Title')}
                </h3>
              </div>
              <p className="text-xs text-[#687083] dark:text-[#A5ADBD] leading-relaxed">
                {t('presStep3Desc')}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
