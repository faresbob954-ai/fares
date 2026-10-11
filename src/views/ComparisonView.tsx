import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  X, 
  Plus, 
  Trash2, 
  Share2, 
  Printer, 
  Check, 
  AlertCircle,
  Eye,
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useComparison } from '../context/ComparisonContext';
import { products } from '../data/products';
import { Product } from '../types';
import { popularComparisons } from '../data/comparisons';
import { AdPlacement } from '../components/AdPlacement';
import { SEOMeta } from '../components/SEOMeta';

interface ComparisonViewProps {
  onNavigateCatalog: () => void;
  onSelectProduct: (id: string) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  onNavigateCatalog,
  onSelectProduct,
}) => {
  const { language, t, isRTL } = useLanguage();
  const { 
    selectedProductIds, 
    addProduct, 
    removeProduct, 
    clearComparison, 
    swapProduct, 
    maxComparisonLimit 
  } = useComparison();

  const [highlightDiffs, setHighlightDiffs] = useState<boolean>(true);
  const [filterMode, setFilterMode] = useState<'all' | 'diffs' | 'highlights'>('all');
  const [addDropdownOpen, setAddDropdownOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Retrieve full product objects for selected IDs
  const activeProducts = useMemo(() => {
    return selectedProductIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [selectedProductIds]);

  // Candidates available to add to comparison
  const availableToAdd = useMemo(() => {
    return products.filter(p => !selectedProductIds.includes(p.id));
  }, [selectedProductIds]);

  // Consolidate all specification sections across compared products
  const consolidatedSections = useMemo(() => {
    if (activeProducts.length === 0) return [];

    const sectionMap = new Map<string, {
      titleEn: string;
      titleAr: string;
      itemMap: Map<string, {
        labelEn: string;
        labelAr: string;
        isHighlight?: boolean;
      }>;
    }>();

    activeProducts.forEach(product => {
      product.specifications.forEach(section => {
        if (!sectionMap.has(section.titleEn)) {
          sectionMap.set(section.titleEn, {
            titleEn: section.titleEn,
            titleAr: section.titleAr,
            itemMap: new Map()
          });
        }
        const currentSec = sectionMap.get(section.titleEn)!;
        section.items.forEach(item => {
          if (!currentSec.itemMap.has(item.key)) {
            currentSec.itemMap.set(item.key, {
              labelEn: item.labelEn,
              labelAr: item.labelAr,
              isHighlight: item.isHighlight
            });
          }
        });
      });
    });

    return Array.from(sectionMap.values()).map(sec => ({
      titleEn: sec.titleEn,
      titleAr: sec.titleAr,
      items: Array.from(sec.itemMap.entries()).map(([key, info]) => ({
        key,
        labelEn: info.labelEn,
        labelAr: info.labelAr,
        isHighlight: info.isHighlight
      }))
    }));
  }, [activeProducts]);

  // Helper to extract a spec value for a product
  const getProductSpecValue = (product: Product, sectionTitleEn: string, itemKey: string) => {
    const sec = product.specifications.find(s => s.titleEn === sectionTitleEn);
    if (!sec) return null;
    const item = sec.items.find(i => i.key === itemKey);
    return item ? (language === 'ar' ? item.valueAr : item.valueEn) : null;
  };

  // Helper to check if a specific row has differing values across products
  const checkRowDiffers = (sectionTitleEn: string, itemKey: string): boolean => {
    if (activeProducts.length < 2) return false;
    const values = activeProducts.map(p => getProductSpecValue(p, sectionTitleEn, itemKey) || '');
    const firstVal = values[0];
    return values.some(v => v !== firstVal);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // EMPTY STATE (fewer than 2 devices selected)
  if (activeProducts.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SEOMeta
          title={t('comparisonTitle')}
          description={t('emptyComparisonDesc')}
        />

        <div className="w-16 h-16 rounded-2xl bg-[#F7F8FC] dark:bg-[#191C24] flex items-center justify-center mx-auto text-[#635BFF] dark:text-[#36BFFA] border border-[#E8EAF0] dark:border-[#2A2E39] shadow-sm">
          <Scale className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl font-black text-[#171923] dark:text-[#F5F7FF]">
            {t('emptyComparisonTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
            {t('emptyComparisonDesc')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNavigateCatalog}
            className="px-6 py-3 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            {t('exploreCatalogBtn')}
          </button>
        </div>

        {/* Quick launch popular matchups */}
        <div className="pt-10 border-t border-[#E8EAF0] dark:border-[#2A2E39] space-y-4 text-left rtl:text-right">
          <h2 className="text-xs font-bold text-[#687083] dark:text-slate-400 uppercase tracking-wider text-center">
            {language === 'ar' ? 'أو ابدأ بإحدى هذه المقارنات الشائعة بنقرة واحدة:' : 'Or launch one of these verified matchups with 1-click:'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {popularComparisons.slice(0, 3).map(pair => (
              <button
                key={pair.id}
                type="button"
                onClick={() => {
                  clearComparison();
                  pair.productIds.forEach(id => addProduct(id));
                }}
                className="p-3.5 bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF]/50 rounded-xl text-xs text-[#171923] dark:text-slate-200 text-left rtl:text-right hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="font-bold text-[#171923] dark:text-[#F5F7FF] group-hover:text-[#635BFF] dark:group-hover:text-[#36BFFA] mb-1 line-clamp-1 transition-colors">
                  {language === 'ar' ? pair.titleAr : pair.titleEn}
                </div>
                <div className="text-[11px] text-[#687083] dark:text-slate-400 line-clamp-1">
                  {pair.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Schema structured breadcrumbs for comparison
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexora.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comparison',
        item: 'https://nexora.org/compare'
      }
    ]
  };

  const comparisonTitle = `${activeProducts.map(p => p.model).join(' vs ')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOMeta
        title={`${comparisonTitle} - Side-by-Side Comparison`}
        description={`Direct technical comparison between ${activeProducts.map(p => p.model).join(', ')}. Compare silicon, screen tech, cameras, and dimensions.`}
        schemaData={schemaBreadcrumbs}
      />

      {/* Top Banner & Control Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E8EAF0] dark:border-[#2A2E39] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#635BFF] dark:text-[#36BFFA] mb-1">
            <Scale className="w-4 h-4" />
            <span>Hardware Comparison Matrix ({activeProducts.length}/{maxComparisonLimit})</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#171923] dark:text-[#F5F7FF] tracking-tight">
            {comparisonTitle}
          </h1>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2 no-print">
          {/* Highlight Differences Button */}
          <button
            type="button"
            onClick={() => setHighlightDiffs(!highlightDiffs)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              highlightDiffs
                ? 'bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white shadow-xs'
                : 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-slate-300 border border-[#E8EAF0] dark:border-[#2A2E39] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('diffToggleLabel')}</span>
          </button>

          {/* Filter Row View */}
          <div className="flex items-center bg-[#F7F8FC] dark:bg-[#111318] p-1 rounded-xl text-xs font-medium border border-[#E8EAF0] dark:border-[#2A2E39]">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white shadow-2xs font-bold'
                  : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              {t('diffToggleAll')}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('diffs')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'diffs'
                  ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white shadow-2xs font-bold'
                  : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              {t('diffToggleDiffsOnly')}
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('highlights')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'highlights'
                  ? 'bg-white dark:bg-[#191C24] text-[#171923] dark:text-white shadow-2xs font-bold'
                  : 'text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white'
              }`}
            >
              {t('keySpecsOnly')}
            </button>
          </div>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-2 bg-white dark:bg-[#191C24] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            title="Print Specification Sheet"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 bg-white dark:bg-[#191C24] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            title="Share Comparison Link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {copiedToast && (
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              {t('linkCopied')}
            </span>
          )}

          {/* Clear All */}
          <button
            type="button"
            onClick={clearComparison}
            className="p-2 text-[#687083] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl text-xs transition-colors cursor-pointer"
            title={t('clearAll')}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table Card */}
      <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-xs overflow-hidden">
        
        {/* Responsive horizontal scroll wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left rtl:text-right text-xs min-w-[700px]">
            
            {/* Table Header: Devices Cards */}
            <thead>
              <tr className="border-b border-[#E8EAF0] dark:border-[#2A2E39] bg-[#F7F8FC] dark:bg-[#111318]">
                <th className="p-4 w-52 sm:w-60 font-semibold text-[#171923] dark:text-slate-400 align-top shrink-0">
                  <div className="space-y-1">
                    <span className="uppercase text-[10px] tracking-wider font-mono text-[#687083] dark:text-slate-500 block">
                      Specification Parameter
                    </span>
                    <span className="text-[#171923] dark:text-[#F5F7FF] font-bold text-sm block">
                      Hardware Features
                    </span>
                  </div>

                  {/* Add Slot Button if < 4 */}
                  {activeProducts.length < maxComparisonLimit && (
                    <div className="relative mt-4 no-print">
                      <button
                        type="button"
                        onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                        className="w-full py-1.5 px-2 bg-white dark:bg-[#191C24] border border-dashed border-[#635BFF]/40 hover:border-[#635BFF] text-[#635BFF] dark:text-[#36BFFA] rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('addAnotherDevice')}</span>
                      </button>

                      {addDropdownOpen && (
                        <div
                          className={`absolute top-full mt-1.5 w-64 bg-white dark:bg-[#191C24] rounded-xl shadow-xl border border-[#E8EAF0] dark:border-[#2A2E39] py-1.5 z-50 max-h-60 overflow-y-auto ${
                            isRTL ? 'right-0' : 'left-0'
                          }`}
                        >
                          <div className="px-3 py-1 text-[10px] font-bold text-[#687083] dark:text-slate-400 uppercase">
                            {t('selectDeviceToCompare')}
                          </div>
                          {availableToAdd.map(candidate => (
                            <button
                              key={candidate.id}
                              type="button"
                              onClick={() => {
                                addProduct(candidate.id);
                                setAddDropdownOpen(false);
                              }}
                              className="w-full px-3 py-2 text-left rtl:text-right hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] flex items-center gap-2 text-xs text-[#171923] dark:text-slate-200 cursor-pointer"
                            >
                              <img
                                src={candidate.imageUrl}
                                alt={candidate.model}
                                className="w-6 h-6 object-cover rounded bg-slate-100 dark:bg-slate-800 shrink-0 border border-[#E8EAF0] dark:border-[#2A2E39]"
                              />
                              <div className="truncate">
                                <span className="font-semibold block">{candidate.model}</span>
                                <span className="text-[10px] text-[#687083] dark:text-slate-400 block">{candidate.brand}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </th>

                {/* Columns for each active product */}
                {activeProducts.map(product => {
                  const price = product.prices[0];
                  return (
                    <th
                      key={product.id}
                      className="p-4 align-top border-s border-[#E8EAF0] dark:border-[#2A2E39] w-64 sm:w-72 relative group bg-white dark:bg-[#191C24]"
                    >
                      <div className="space-y-3">
                        {/* Remove Device Button */}
                        <div className="flex items-center justify-between no-print">
                          <span className="text-[10px] font-mono text-[#687083] dark:text-slate-400 uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeProduct(product.id)}
                            className="text-[#687083] dark:text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-[#F7F8FC] dark:hover:bg-[#111318] transition-colors cursor-pointer"
                            title={`${t('removeDevice')} ${product.model}`}
                            aria-label={`${t('removeDevice')} ${product.model}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Thumbnail Image */}
                        <div
                          onClick={() => onSelectProduct(product.id)}
                          className="aspect-4/3 w-full bg-[#F7F8FC] dark:bg-[#111318] rounded-xl overflow-hidden border border-[#E8EAF0] dark:border-[#2A2E39] cursor-pointer"
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.model}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                        </div>

                        {/* Title & Price */}
                        <div>
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product.id)}
                            className="text-sm font-bold text-[#171923] dark:text-[#F5F7FF] hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors text-left rtl:text-right line-clamp-1 block cursor-pointer"
                          >
                            {product.model}
                          </button>
                          <div className="mt-1 flex items-baseline justify-between">
                            <span className="font-mono font-bold text-[#171923] dark:text-[#F5F7FF] text-sm">
                              {price ? `${price.currency === 'USD' ? '$' : price.currency + ' '}${price.price.toLocaleString()}` : t('specNotSpecified')}
                            </span>
                            <span className="text-[10px] text-[#687083] dark:text-slate-400">
                              (Ref MSRP)
                            </span>
                          </div>
                        </div>

                        {/* Swap Product Dropdown */}
                        <div className="no-print pt-1">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                swapProduct(product.id, e.target.value);
                              }
                            }}
                            defaultValue=""
                            className="w-full py-1.5 px-2 text-[11px] bg-white dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF] rounded-lg text-[#171923] dark:text-slate-300 focus:outline-none"
                          >
                            <option value="" disabled>
                              Swap device...
                            </option>
                            {availableToAdd.map(other => (
                              <option key={other.id} value={other.id}>
                                Swap with {other.model}
                              </option>
                            ))}
                          </select>
                        </div>

                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body: Sections and Rows */}
            <tbody className="divide-y divide-[#E8EAF0] dark:divide-[#2A2E39]">
              {consolidatedSections.map((section, sIdx) => {
                // Filter rows according to user's view mode
                const rowsToRender = section.items.filter(item => {
                  const differs = checkRowDiffers(section.titleEn, item.key);
                  if (filterMode === 'diffs') {
                    return differs;
                  }
                  if (filterMode === 'highlights') {
                    return item.isHighlight;
                  }
                  return true;
                });

                if (rowsToRender.length === 0) return null;

                return (
                  <React.Fragment key={sIdx}>
                    {/* Section Header Row */}
                    <tr className="bg-[#F7F8FC] dark:bg-[#111318] font-bold text-[#171923] dark:text-slate-200">
                      <td
                        colSpan={activeProducts.length + 1}
                        className="py-2.5 px-4 text-xs tracking-wider uppercase bg-[#F7F8FC] dark:bg-[#111318] text-[#635BFF] dark:text-[#36BFFA] font-extrabold border-y border-[#E8EAF0] dark:border-[#2A2E39]"
                      >
                        {language === 'ar' ? section.titleAr : section.titleEn}
                      </td>
                    </tr>

                    {/* Specification Rows */}
                    {rowsToRender.map(item => {
                      const differs = checkRowDiffers(section.titleEn, item.key);
                      const isHighlightedRow = highlightDiffs && differs;

                      return (
                        <tr
                          key={item.key}
                          className={`transition-colors ${
                            isHighlightedRow
                              ? 'bg-gradient-to-r from-[#635BFF]/5 to-[#36BFFA]/5 dark:from-[#635BFF]/15 dark:to-[#36BFFA]/15 border-s-4 border-[#635BFF] dark:border-[#36BFFA]'
                              : 'hover:bg-[#F7F8FC]/60 dark:hover:bg-[#111318]/40'
                          }`}
                        >
                          {/* Row Label */}
                          <td className="p-3.5 font-semibold text-[#171923] dark:text-slate-300 align-top">
                            <div className="flex items-center gap-2">
                              <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                              {differs && (
                                <span
                                  className="w-2 h-2 rounded-full bg-gradient-to-r from-[#635BFF] to-[#36BFFA] shrink-0 shadow-2xs"
                                  title="Specification differs across compared devices"
                                />
                              )}
                            </div>
                          </td>

                          {/* Value in each product column */}
                          {activeProducts.map(product => {
                            const val = getProductSpecValue(product, section.titleEn, item.key);
                            return (
                              <td
                                key={`${product.id}-${item.key}`}
                                className={`p-3.5 border-s border-[#E8EAF0] dark:border-[#2A2E39] align-top text-[#171923] dark:text-[#F5F7FF] ${
                                  differs && highlightDiffs ? 'font-bold' : ''
                                }`}
                              >
                                {val ? (
                                  <span>{val}</span>
                                ) : (
                                  <span className="text-[#687083] dark:text-slate-500 italic">
                                    {t('specNotSpecified')}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Factual Analysis & Transparency Note */}
      <section className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-[#171923] dark:text-[#F5F7FF] font-bold text-sm">
          <Info className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
          <h3>{t('factualAnalysisTitle')}</h3>
        </div>
        <p className="text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed">
          {t('factualAnalysisNote')}
        </p>
        <p className="text-[11px] text-[#687083] dark:text-slate-500">
          Source: Official manufacturer engineering specifications normalized for direct side-by-side comparison.
        </p>
      </section>

      {/* Configured Ad Placement */}
      <AdPlacement format="leaderboard" />

    </div>
  );
};
