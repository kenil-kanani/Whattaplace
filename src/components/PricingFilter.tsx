'use client';

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { PricingFilterProps } from '@/types';
import { HiCurrencyRupee } from 'react-icons/hi2';

export default function PricingFilter({ onFilterChange }: PricingFilterProps) {
  const { pricingFilter } = useAppContext();
  const {
    filters,
    handlePriceRangeChange,
    priceRangeOptions,
  } = pricingFilter;

  React.useEffect(() => {
    console.log('PricingFilter - filters changed:', filters);
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white rounded-4xl p-6 shadow-lg max-w-[430px] font-dm-sans">

      <div className="flex items-center gap-3 mb-6">
        <HiCurrencyRupee className="text-2xl text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">Price Filter</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Ranges</h4>
        <div className="space-y-2">
          {priceRangeOptions.map((range) => (
            <label
              key={range.value}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.priceRanges.has(range.value)}
                onChange={(e) => handlePriceRangeChange(range.value, e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 font-medium">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
    </div>
  );
}
