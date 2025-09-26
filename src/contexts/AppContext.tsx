'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useLocationFilter, UseLocationFilterReturn } from '@/hooks/useLocationFilter';
import { usePricingFilter, UsePricingFilterReturn } from '@/hooks/usePricingFilter';
import { LocationHierarchy, ApiResponse } from '@/types';

interface AppContextType {
  locationFilter: UseLocationFilterReturn;
  pricingFilter: UsePricingFilterReturn;
  locationHierarchy: LocationHierarchy[];
  isLoadingHierarchy: boolean;
  hierarchyError: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [locationHierarchy, setLocationHierarchy] = useState<LocationHierarchy[]>([]);
  const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(true);
  const [hierarchyError, setHierarchyError] = useState<string | null>(null);

  // Fetch location hierarchy from API
  useEffect(() => {
    const fetchLocationHierarchy = async () => {
      try {
        setIsLoadingHierarchy(true);
        setHierarchyError(null);
        
        const response = await fetch('/api/location-hierarchy');
        const result: ApiResponse<LocationHierarchy[]> = await response.json();
        
        if (result.success) {
          setLocationHierarchy(result.data);
        } else {
          setHierarchyError(result.error || 'Failed to fetch location hierarchy');
        }
      } catch (error) {
        console.error('Error fetching location hierarchy:', error);
        setHierarchyError('Failed to fetch location hierarchy');
      } finally {
        setIsLoadingHierarchy(false);
      }
    };

    fetchLocationHierarchy();
  }, []);

  const locationFilter = useLocationFilter({
    locationHierarchy,
    isLoading: isLoadingHierarchy,
  });

  const pricingFilter = usePricingFilter();

  const contextValue: AppContextType = {
    locationFilter,
    pricingFilter,
    locationHierarchy,
    isLoadingHierarchy,
    hierarchyError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
