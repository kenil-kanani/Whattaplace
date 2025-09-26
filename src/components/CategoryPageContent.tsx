'use client';

import LocationGrid from './LocationGrid';
import LocationFilter from './LocationFilter';
import { useAppContext } from '@/contexts/AppContext';

interface CategoryPageContentProps {
  category: string;
}

export default function CategoryPageContent({ category }: CategoryPageContentProps) {
  const { locationFilter } = useAppContext();

  return (
    <div className="flex gap-8">
      {/* Filter Sidebar */}
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-8">
          <LocationFilter />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <LocationGrid 
          category={category} 
          locationFilters={locationFilter.filters}
        />
      </div>
    </div>
  );
}
