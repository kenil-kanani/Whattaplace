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
    <div className="flex gap-2">
      {/* Filter Sidebar */}
      <div className="flex-shrink-0">
        <div className="sticky top-8 space-y-4">
          <LocationFilter />
          <PricingFilter />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <SpacesGrid 
          category={category} 
          locationFilters={locationFilter.filters}
          pricingFilters={pricingFilter.filters}
        />
      </div>
    </div>
  );
}
