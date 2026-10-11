import React from 'react';
import { Plus, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useComparison } from '../context/ComparisonContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onCompareDirect?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const { language, t, isRTL } = useLanguage();
  const { addProduct, removeProduct, isInComparison } = useComparison();

  const inComp = isInComparison(product.id);
  const primaryPrice = product.prices[0];

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inComp) {
      removeProduct(product.id);
    } else {
      addProduct(product.id);
    }
  };

  const keySpecsSnippet = product.specifications[0]?.items.slice(0, 2) || [];

  return (
    <article
      onClick={() => onSelect(product.id)}
      className={`group relative flex flex-col justify-between bg-white dark:bg-[#191C24] rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
        inComp
          ? 'border-[#635BFF] ring-2 ring-[#635BFF]/20 shadow-sm'
          : 'border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/40 dark:hover:border-[#36BFFA]/40'
      }`}
    >
      <div>
        {/* Consistent Image Container with subtle hover zoom */}
        <div className="relative aspect-4/3 w-full bg-[#F7F8FC] dark:bg-[#111318] overflow-hidden border-b border-[#E8EAF0] dark:border-[#2A2E39]">
          <img
            src={product.imageUrl}
            alt={language === 'ar' ? product.imageAltAr : product.imageAltEn}
            loading="lazy"
            className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300 ease-out"
          />
          
          {/* Subtle Year & Category kicker */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-semibold tracking-wide text-[#171923] dark:text-slate-200 bg-white/95 dark:bg-[#191C24]/95 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs">
              {product.brand} · {product.releaseYear}
            </span>
            <span className="text-[10px] font-mono font-medium text-[#687083] dark:text-slate-400 bg-white/95 dark:bg-[#191C24]/95 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-[#E8EAF0] dark:border-[#2A2E39] shadow-2xs">
              Ref Demo
            </span>
          </div>

          {/* Active comparison corner badge */}
          {inComp && (
            <div className="absolute bottom-2.5 right-2.5 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3" />
              <span>{t('inComparison')}</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Title & Subtitle */}
          <div>
            <h3 className="font-bold text-base text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] transition-colors line-clamp-1">
              {product.model}
            </h3>
            <p className="text-xs text-[#687083] dark:text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
              {language === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>
          </div>

          {/* Key Specs unboxed snippet */}
          <div className="py-2 border-y border-[#E8EAF0] dark:border-[#2A2E39] text-xs text-[#687083] dark:text-slate-300 space-y-1.5">
            {keySpecsSnippet.map((spec) => (
              <div key={spec.key} className="flex justify-between items-baseline gap-2">
                <span className="text-[#687083] dark:text-slate-400 truncate">
                  {language === 'ar' ? spec.labelAr : spec.labelEn}
                </span>
                <span className="font-semibold text-[#171923] dark:text-slate-200 text-right shrink-0">
                  {language === 'ar' ? spec.valueAr : spec.valueEn}
                </span>
              </div>
            ))}
          </div>

          {/* Reference Price */}
          <div className="flex items-baseline justify-between pt-0.5">
            <div>
              <span className="text-[10px] text-[#687083] dark:text-slate-400 block uppercase tracking-wider">
                {t('priceLabel')} ({t('sampleDataBadge')})
              </span>
              <span className="text-base font-extrabold text-[#171923] dark:text-[#F5F7FF] font-mono">
                {primaryPrice ? `${primaryPrice.currency === 'USD' ? '$' : primaryPrice.currency + ' '}${primaryPrice.price.toLocaleString()}` : t('specNotSpecified')}
              </span>
            </div>
            <span className="text-[11px] text-[#687083] dark:text-slate-400 font-medium">
              {primaryPrice?.market || 'Global MSRP'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-[#F7F8FC] dark:bg-[#111318] border-t border-[#E8EAF0] dark:border-[#2A2E39] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleToggleCompare}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all duration-200 active:scale-98 cursor-pointer ${
            inComp
              ? 'bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white shadow-xs'
              : 'bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-slate-200 hover:border-[#635BFF] hover:text-[#635BFF] dark:hover:text-[#36BFFA]'
          }`}
          aria-label={inComp ? t('inComparison') : t('addToCompare')}
        >
          {inComp ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{t('inComparison')}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{t('addToCompare')}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product.id);
          }}
          className="inline-flex items-center justify-center p-2 text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] hover:bg-white dark:hover:bg-[#191C24] rounded-xl border border-transparent hover:border-[#E8EAF0] dark:hover:border-[#2A2E39] transition-all duration-200 cursor-pointer"
          title={t('viewDetails')}
        >
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </article>
  );
};
