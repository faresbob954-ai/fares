import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Scale, 
  Check, 
  Share2, 
  ShieldCheck, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useComparison } from '../context/ComparisonContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';

interface ProductDetailViewProps {
  productId: string;
  onBack: () => void;
  onSelectProduct: (id: string) => void;
  onNavigateCompare: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  onBack,
  onSelectProduct,
  onNavigateCompare
}) => {
  const { language, t, isRTL } = useLanguage();
  const { addProduct, removeProduct, isInComparison } = useComparison();
  const [copiedToast, setCopiedToast] = useState(false);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">{t('noResultsTitle')}</h2>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          {language === 'ar' ? 'العودة للكتالوج' : 'Back to Catalog'}
        </button>
      </div>
    );
  }

  const inComp = isInComparison(product.id);
  const primaryPrice = product.prices[0];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const otherProductsForCompare = products.filter(p => p.id !== product.id);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handleQuickCompareWith = (otherId: string) => {
    if (!otherId) return;
    addProduct(product.id);
    addProduct(otherId);
    onNavigateCompare();
  };

  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.model}`,
    image: product.imageUrl,
    description: language === 'ar' ? product.descriptionAr : product.descriptionEn,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: primaryPrice ? {
      '@type': 'Offer',
      price: primaryPrice.price,
      priceCurrency: primaryPrice.currency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31'
    } : undefined
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOMeta
        title={`${product.brand} ${product.model} Specs`}
        description={language === 'ar' ? product.descriptionAr : product.descriptionEn}
        type="product"
        schemaData={schemaProduct}
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-[#F5F7FF] transition-colors cursor-pointer"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{language === 'ar' ? 'الرجوع إلى الكتالوج' : 'Back to Catalog'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title={t('shareProduct')}
          >
            <Share2 className="w-3.5 h-3.5 text-[#687083] dark:text-slate-400" />
            <span className="hidden sm:inline">{t('shareProduct')}</span>
          </button>
          {copiedToast && (
            <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
              {t('linkCopied')}
            </span>
          )}
        </div>
      </div>

      {/* Header Overview Card */}
      <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Product Image */}
        <div className="md:col-span-5 bg-[#F7F8FC] dark:bg-[#111318] rounded-xl overflow-hidden aspect-4/3 flex items-center justify-center border border-[#E8EAF0] dark:border-[#2A2E39]">
          <img
            src={product.imageUrl}
            alt={language === 'ar' ? product.imageAltAr : product.imageAltEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details & Actions */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#687083] dark:text-slate-400 font-mono">
              <span className="uppercase text-[#635BFF] dark:text-[#36BFFA] font-bold">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.releaseYear}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171923] dark:text-[#F5F7FF]">
              {product.model}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
            {language === 'ar' ? product.descriptionAr : product.descriptionEn}
          </p>

          {/* Key Hardware Highlights */}
          <div className="space-y-2 pt-2 border-t border-[#E8EAF0] dark:border-[#2A2E39]">
            <h3 className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] uppercase tracking-wider">
              {t('keyFeaturesTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#687083] dark:text-slate-300">
              {(language === 'ar' ? product.keyFeaturesAr : product.keyFeaturesEn).map((feature, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#635BFF] dark:text-[#36BFFA] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Box - Clearly marked as Sample Reference */}
          <div className="bg-[#F7F8FC] dark:bg-[#111318] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#687083] dark:text-slate-400 uppercase tracking-wider block">
                  {t('referencePricingTitle')} ({t('sampleDataBadge')})
                </span>
                <span className="text-2xl font-bold text-[#171923] dark:text-[#F5F7FF] font-mono">
                  {primaryPrice ? `${primaryPrice.currency === 'USD' ? '$' : primaryPrice.currency + ' '}${primaryPrice.price.toLocaleString()}` : t('specNotSpecified')}
                </span>
              </div>
              <span className="text-xs text-[#687083] dark:text-slate-400 font-medium">
                {primaryPrice?.market || 'Global Market'}
              </span>
            </div>
            <p className="text-[11px] text-[#687083] dark:text-slate-500 leading-relaxed">
              <Info className="w-3 h-3 inline me-1 text-[#635BFF] dark:text-[#36BFFA]" />
              {t('priceSampleNotice')}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (inComp) {
                  removeProduct(product.id);
                } else {
                  addProduct(product.id);
                }
              }}
              className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-98 ${
                inComp
                  ? 'bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white shadow-sm'
                  : 'bg-[#171923] dark:bg-white text-white dark:text-[#171923] hover:opacity-95'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{inComp ? t('inComparison') : t('addToCompare')}</span>
            </button>

            {/* Quick compare with another device */}
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => handleQuickCompareWith(e.target.value)}
                defaultValue=""
                className="py-2.5 px-3 bg-white dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl text-xs font-semibold text-[#171923] dark:text-slate-200 hover:border-[#635BFF] focus:outline-none"
              >
                <option value="" disabled>
                  {t('compareWithDropdown')}
                </option>
                {otherProductsForCompare.map(other => (
                  <option key={other.id} value={other.id}>
                    {other.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Ad Placement */}
      <AdPlacement format="leaderboard" />

      {/* Detailed Specifications Matrix */}
      <section className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-6 sm:p-8 space-y-8 shadow-xs">
        <div className="border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#171923] dark:text-[#F5F7FF]">
              {t('specificationsTitle')}
            </h2>
            <p className="text-xs text-[#687083] dark:text-slate-400 mt-0.5">
              {product.brand} {product.model} · {t('verifiedSpecsBadge')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#687083] dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('lastUpdatedLabel')}: {product.lastUpdated}</span>
          </div>
        </div>

        <div className="space-y-8">
          {product.specifications.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#635BFF] dark:text-[#36BFFA] bg-[#F7F8FC] dark:bg-[#111318] py-2 px-3.5 rounded-xl border-s-4 border-[#635BFF] dark:border-[#36BFFA]">
                {language === 'ar' ? section.titleAr : section.titleEn}
              </h3>

              <div className="divide-y divide-[#E8EAF0] dark:divide-[#2A2E39] text-xs">
                {section.items.map((item) => (
                  <div key={item.key} className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 items-baseline">
                    <span className="font-medium text-[#687083] dark:text-slate-400">
                      {language === 'ar' ? item.labelAr : item.labelEn}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#171923] dark:text-[#F5F7FF]">
                      {language === 'ar' ? item.valueAr : item.valueEn}
                      {item.source && (
                        <span className="block text-[11px] text-[#687083] dark:text-slate-500 font-normal mt-0.5">
                          Source: {item.source}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Source Attribution Box */}
        <div className="p-4 bg-[#F7F8FC] dark:bg-[#111318] rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] flex items-start gap-3 text-xs text-[#687083] dark:text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#171923] dark:text-[#F5F7FF]">
              {t('sourceAttributionTitle')}
            </p>
            <p className="text-[#687083] dark:text-slate-400">
              {product.dataSource}
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-5">
          <div className="border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-3">
            <h2 className="text-lg font-bold text-[#171923] dark:text-[#F5F7FF]">
              {t('relatedProductsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
