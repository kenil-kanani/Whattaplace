export interface Location {
  id: string;
  title: string;
  type: string;
  price: {
    amount: number;
    currency: string;
    period: string;
    fullText: string;
  };
  rating: {
    value: number;
    text: string;
  };
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string | null;
  detailsLink: string;
  sourceFile: string;
  country?: string;
  state?: string;
  city?: string;
}

export interface LocationHierarchy {
  country: string;
  states: {
    state: string;
    cities: string[];
  }[];
}

export interface LocationFilterState {
  countries: Set<string>;
  states: Set<string>;
  cities: Set<string>;
}

export interface LocationFilterProps {
  onFilterChange?: (filters: LocationFilterState) => void;
  locationHierarchy?: LocationHierarchy[];
  initialFilters?: LocationFilterState;
  isLoading?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}

export interface PricingFilterState {
  priceRanges: Set<string>;
}

export interface PricingFilterProps {
  onFilterChange?: (filters: PricingFilterState) => void;
  initialFilters?: PricingFilterState;
}

export interface LocationFilterParams {
  category?: string;
  countries?: string;
  states?: string;
  cities?: string;
  priceRanges?: string;
}

export { VALID_CATEGORIES } from '@/config/categories';
export type { CategoryType } from '@/config/categories';
