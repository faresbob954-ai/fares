import React from 'react';
import { X, ArrowRight, ArrowLeft, Scale, Trash2 } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

interface ComparisonBarProps {
  onOpenCompare: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({ onOpenCompare }) => {
  const { selectedProductIds, removeProduct, clearComparison, maxComparisonLimit } = useComparison();
  const { language, t, isRTL } = useLanguage();

  if (selectedProductIds.length === 0) return null;

  const selectedProducts = selectedProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const canCompare = selectedProductIds.length >= 2;

  return (
    <aside
      aria-label="Active comparison bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#111318]/95 backdrop-blur-md text-[#171923] dark:text-[#F5F7FF] border-t border-[#E8EAF0] dark:border-[#2A2E39] shadow-xl py-3 px-4 sm:px-6 animate-in slide-in-from-bottom duration-200"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Device thumbnails & info */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#635BFF] dark:text-[#36BFFA] shrink-0">
            <Scale className="w-4 h-4" />
            <span className="hidden md:inline">{t('comparisonBarTitle')}</span>
            <span>({selectedProductIds.length}/{maxComparisonLimit})</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedProducts.map((product) => {
              if (!product) return null;
              return (
                <div
                  key={product.id}
                  className="flex items-center gap-2 bg-[#F7F8FC] dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl py-1 px-2.5 text-xs shrink-0 max-w-[160px] sm:max-w-[200px]"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.model}
                    className="w-7 h-7 object-cover rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 border border-[#E8EAF0] dark:border-slate-700/60"
                  />
                  <span className="truncate font-medium text-[#171923] dark:text-slate-200 text-[11px]">
                    {product.model}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="text-[#687083] dark:text-slate-400 hover:text-red-500 p-0.5 rounded transition-colors"
                    title={t('removeDevice')}
                    aria-label={`${t('removeDevice')} ${product.model}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            {/* Empty slots indicator */}
            {Array.from({ length: maxComparisonLimit - selectedProductIds.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="hidden lg:flex items-center justify-center w-16 h-9 border border-dashed border-[#E8EAF0] dark:border-[#2A2E39] rounded-xl text-[10px] text-[#687083] dark:text-slate-500 font-mono"
              >
                +Slot
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0">
          <button
            type="button"
            onClick={clearComparison}
            className="text-xs text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white flex items-center gap-1 px-2 py-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('clearAll')}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCompare}
            disabled={!canCompare}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              canCompare
                ? 'bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white shadow-sm hover:opacity-95 active:scale-98 cursor-pointer'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-[#E8EAF0] dark:border-slate-700'
            }`}
          >
            <span>{t('readyToCompare', { count: selectedProductIds.length })}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
