'use client';

import SpacesGrid from './SpacesGrid';
import LocationFilter from './LocationFilter';
import PricingFilter from './PricingFilter';
import { useAppContext } from '@/contexts/AppContext';

interface CategoryPageClientProps {
  category: string;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const { locationFilter, pricingFilter } = useAppContext();

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Filter Sidebar */}
      <div className="w-full lg:w-auto lg:flex-shrink-0">
        <div className="lg:sticky lg:top-8 space-y-4">
          <LocationFilter />
          <PricingFilter />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <SpacesGrid 
          category={category} 
          locationFilters={locationFilter.filters}
          pricingFilters={pricingFilter.filters}
        />
      </div>
    </div>
  );
}
