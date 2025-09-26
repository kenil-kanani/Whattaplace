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
    <div className="bg-white rounded-4xl p-4 mt-3 max-w-[250px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black">Price</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-medium hover:text-black"
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
            className="flex items-center space-x-2 cursor-pointer py-1 hover:bg-gray-50 rounded-lg"
          >
            <input
              type="checkbox"
              checked={filters.priceRanges.has(range.value)}
              onChange={(e) => handlePriceRangeChange(range.value, e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">{range.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
