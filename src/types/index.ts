export type Language = 'en' | 'ar';

export type ProductCategory = 
  | 'smartphones' 
  | 'laptops' 
  | 'tablets' 
  | 'headphones' 
  | 'smartwatches' 
  | 'monitors';

export interface RetailerPrice {
  retailer: string;
  retailerUrl?: string;
  price: number;
  currency: string;
  market: string; // e.g. "US", "GCC", "EU"
  isSampleData: boolean;
  priceUpdatedAt: string; // ISO date string
  inStock?: boolean;
}

export interface SpecificationItem {
  key: string;
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
  isHighlight?: boolean;
  source?: string;
}

export interface SpecificationSection {
  titleEn: string;
  titleAr: string;
  items: SpecificationItem[];
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: ProductCategory;
  releaseYear: number;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  imageAltEn: string;
  imageAltAr: string;
  prices: RetailerPrice[];
  availableMarkets: string[];
  specifications: SpecificationSection[];
  keyFeaturesEn: string[];
  keyFeaturesAr: string[];
  dataSource: string; // e.g., "Official Manufacturer Technical Specifications"
  isSampleData: boolean; // clearly flag if pricing/inventory is illustrative
  lastUpdated: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  iconName: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface BuyingGuideArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  authorEn: string;
  authorAr: string;
  publishedDate: string;
  readTimeMinutes: number;
  category: ProductCategory;
  contentEn: {
    intro: string;
    sections: { heading: string; body: string }[];
    verdict: string;
  };
  contentAr: {
    intro: string;
    sections: { heading: string; body: string }[];
    verdict: string;
  };
}

export interface ComparisonPair {
  id: string;
  productIds: string[];
  titleEn: string;
  titleAr: string;
  category: ProductCategory;
  descriptionEn: string;
  descriptionAr: string;
}

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'all';
  brands: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'year-desc';
}
