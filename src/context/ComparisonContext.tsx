import React, { createContext, useContext, useState, useEffect } from 'react';

interface ComparisonContextType {
  selectedProductIds: string[];
  addProduct: (id: string) => { success: boolean; messageKey?: string };
  removeProduct: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
  swapProduct: (oldId: string, newId: string) => void;
  maxComparisonLimit: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'comparenest_comparison_ids';
export const MAX_COMPARISON_LIMIT = 4;

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_COMPARISON_LIMIT);
      }
    } catch {
      // Fallback
    }
    // Default initial comparison for instant demonstration: iPhone 16 Pro Max vs Samsung Galaxy S25 Ultra
    return ['iphone-16-pro-max', 'galaxy-s25-ultra'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProductIds));
    } catch {
      // Ignore
    }
  }, [selectedProductIds]);

  const addProduct = (id: string): { success: boolean; messageKey?: string } => {
    if (selectedProductIds.includes(id)) {
      return { success: false, messageKey: 'alreadyInComparison' };
    }
    if (selectedProductIds.length >= MAX_COMPARISON_LIMIT) {
      return { success: false, messageKey: 'maxDevicesReached' };
    }
    setSelectedProductIds(prev => [...prev, id]);
    return { success: true };
  };

  const removeProduct = (id: string) => {
    setSelectedProductIds(prev => prev.filter(item => item !== id));
  };

  const clearComparison = () => {
    setSelectedProductIds([]);
  };

  const isInComparison = (id: string): boolean => {
    return selectedProductIds.includes(id);
  };

  const swapProduct = (oldId: string, newId: string) => {
    if (selectedProductIds.includes(newId)) return;
    setSelectedProductIds(prev => prev.map(id => (id === oldId ? newId : id)));
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedProductIds,
        addProduct,
        removeProduct,
        clearComparison,
        isInComparison,
        swapProduct,
        maxComparisonLimit: MAX_COMPARISON_LIMIT,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
