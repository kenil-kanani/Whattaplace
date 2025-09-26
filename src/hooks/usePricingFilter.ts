'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PricingFilterState } from '@/types';


export interface UsePricingFilterReturn {
  filters: PricingFilterState;
  setFilters: (filters: PricingFilterState) => void;
  handlePriceRangeChange: (range: string, checked: boolean) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  updateURL: (filters: PricingFilterState) => void;
  priceRangeOptions: Array<{ label: string; value: string; min: number; max: number }>;
}

const PRICE_RANGE_OPTIONS = [
  { label: 'Under ₹2,000', value: 'under-2000', min: 0, max: 1999 },
  { label: '₹2,000 - ₹5,000', value: '2000-5000', min: 2000, max: 5000 },
  { label: '₹5,000 - ₹8,000', value: '5000-8000', min: 5000, max: 8000 },
  { label: '₹8,000 - ₹12,000', value: '8000-12000', min: 8000, max: 12000 },
  { label: 'Above ₹12,000', value: 'above-12000', min: 12000, max: Infinity },
];

const DEFAULT_FILTERS: PricingFilterState = {
  priceRanges: new Set<string>(),
};

export function usePricingFilter(): UsePricingFilterReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initializeFiltersFromURL = useCallback((): PricingFilterState => {
    const priceRanges = searchParams.get('priceRanges');

    return {
      priceRanges: priceRanges ? new Set(priceRanges.split(',').filter(r => r.trim())) : new Set(),
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<PricingFilterState>(initializeFiltersFromURL);

  useEffect(() => {
    setFilters(initializeFiltersFromURL());
  }, [initializeFiltersFromURL]);

  const updateURL = useCallback((newFilters: PricingFilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.priceRanges.size > 0) {
      params.set('priceRanges', Array.from(newFilters.priceRanges).join(','));
    } else {
      params.delete('priceRanges');
    }
    
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newURL, { scroll: false });
  }, [router, searchParams]);

  const handlePriceRangeChange = useCallback((range: string, checked: boolean) => {
    const newPriceRanges = new Set(filters.priceRanges);
    
    if (checked) {
      newPriceRanges.add(range);
    } else {
      newPriceRanges.delete(range);
    }
    
    const newFilters = { ...filters, priceRanges: newPriceRanges };
    setFilters(newFilters);
    updateURL(newFilters);
  }, [filters, updateURL]);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    updateURL(DEFAULT_FILTERS);
  }, [updateURL]);

  const hasActiveFilters = useMemo(() => {
    return filters.priceRanges.size > 0;
  }, [filters]);

  return {
    filters,
    setFilters,
    handlePriceRangeChange,
    clearAllFilters,
    hasActiveFilters,
    updateURL,
    priceRangeOptions: PRICE_RANGE_OPTIONS,
  };
}
