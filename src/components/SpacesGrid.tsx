'use client';

import { useState, useEffect } from 'react';
import SpacesCard from './SpacesCard';
import { Location, ApiResponse, LocationFilterState, PricingFilterState } from '@/types';

interface SpacesGridProps {
  category: string;
  locationFilters?: LocationFilterState;
  pricingFilters?: PricingFilterState;
}

export default function SpacesGrid({ category, locationFilters, pricingFilters }: SpacesGridProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create stable string representations of the filters for dependency comparison
  const countriesString = locationFilters ? Array.from(locationFilters.countries).sort().join(',') : '';
  const statesString = locationFilters ? Array.from(locationFilters.states).sort().join(',') : '';
  const citiesString = locationFilters ? Array.from(locationFilters.cities).sort().join(',') : '';
  
  // Create stable string representations for pricing filters
  const priceRangesString = pricingFilters ? Array.from(pricingFilters.priceRanges).sort().join(',') : '';

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug: Log the pricing filters
        console.log('SpacesGrid - pricingFilters:', pricingFilters);
        
        // Build query parameters
        const params = new URLSearchParams();
        params.append('category', category);
        
        // Add location filter parameters if they exist
        if (locationFilters) {
          const { countries, states, cities } = locationFilters;
          
          if (countries.size > 0) {
            params.append('countries', Array.from(countries).join(','));
          }
          if (states.size > 0) {
            params.append('states', Array.from(states).join(','));
          }
          if (cities.size > 0) {
            params.append('cities', Array.from(cities).join(','));
          }
        }
        
        // Add pricing filter parameters if they exist
        if (pricingFilters) {
          const { priceRanges } = pricingFilters;
          
          if (priceRanges.size > 0) {
            params.append('priceRanges', Array.from(priceRanges).join(','));
          }
        }
        
        // Debug: Log the API URL
        const apiUrl = `/api/spaces?${params.toString()}`;
        console.log('SpacesGrid - API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        
        const data: ApiResponse<Location[]> = await response.json();
        if (data.success) {
          setLocations(data.data);
        } else {
          throw new Error('API returned error');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, countriesString, statesString, citiesString, priceRangesString]);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-4xl overflow-hidden p-3 animate-pulse flex-1 min-w-[300px] max-w-[400px]"
          >
            <div className="h-56 bg-gray-200 rounded-4xl mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Error loading spaces: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (locations.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No spaces found for this category or selected filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {locations.map((location: Location) => (
        <div key={location.id} className="flex-1 min-w-[300px] max-w-[400px]">
          <SpacesCard 
            location={location} 
          />
        </div>
      ))}
    </div>
  );
}
