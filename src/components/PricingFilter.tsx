'use client';

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { PricingFilterProps } from '@/types';

export default function PricingFilter({ onFilterChange }: PricingFilterProps) {
  const { pricingFilter } = useAppContext();
  const {
    filters,
    handlePriceRangeChange,
    priceRangeOptions,
    clearAllFilters,
    hasActiveFilters,
  } = pricingFilter;

  React.useEffect(() => {
    console.log('PricingFilter - filters changed:', filters);
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return (
    <div className="bg-gray-50/80 border border-gray-200/60 rounded-2xl p-5 max-w-[250px] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Price</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Price Ranges */}
      <div className="space-y-1">
        {priceRangeOptions.map((range) => (
          <label
            key={range.value}
            className="flex items-center space-x-2 cursor-pointer py-1 hover:bg-white/40 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.priceRanges.has(range.value)}
              onChange={(e) => handlePriceRangeChange(range.value, e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-400/20"
            />
            <span className="text-sm text-gray-600">{range.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
