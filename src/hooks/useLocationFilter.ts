'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LocationFilterState, LocationHierarchy } from '@/types';

export interface UseLocationFilterProps {
  locationHierarchy?: LocationHierarchy[];
  onFilterChange?: (filters: LocationFilterState) => void;
  debounceMs?: number;
  isLoading?: boolean;
}

export interface UseLocationFilterReturn {
  // Filter state
  filters: LocationFilterState;
  setFilters: (filters: LocationFilterState) => void;
  
  // Expansion state
  expandedCountries: Set<string>;
  expandedStates: Set<string>;
  toggleCountryExpansion: (country: string) => void;
  toggleStateExpansion: (countryState: string) => void;
  
  // Search functionality
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  filteredLocationHierarchy: LocationHierarchy[];
  
  // Filter handlers
  handleCountryChange: (country: string, checked: boolean) => void;
  handleStateChange: (country: string, state: string, checked: boolean) => void;
  handleCityChange: (city: string, checked: boolean) => void;
  
  // Utility functions
  isCountryIndeterminate: (country: string) => boolean;
  isStateIndeterminate: (country: string, state: string) => boolean;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  
  // Loading state
  isLoading: boolean;
  
  // URL synchronization
  updateURL: (filters: LocationFilterState) => void;
}

export function useLocationFilter({
  locationHierarchy = [],
  onFilterChange,
  debounceMs = 100,
  isLoading = false
}: UseLocationFilterProps): UseLocationFilterReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL query parameters
  const [filters, setFilters] = useState<LocationFilterState>(() => {
    const countries = searchParams.get('countries');
    const states = searchParams.get('states');
    const cities = searchParams.get('cities');

    return {
      countries: new Set(countries ? countries.split(',').filter(c => c.trim()) : []),
      states: new Set(states ? states.split(',').filter(s => s.trim()) : []),
      cities: new Set(cities ? cities.split(',').filter(c => c.trim()) : []),
    };
  });

  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update URL with new filter parameters
  const updateURL = useCallback((newFilters: LocationFilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove existing filter parameters
    params.delete('countries');
    params.delete('states');
    params.delete('cities');
    
    // Add new filter parameters if they exist
    if (newFilters.countries.size > 0) {
      params.set('countries', Array.from(newFilters.countries).join(','));
    }
    if (newFilters.states.size > 0) {
      params.set('states', Array.from(newFilters.states).join(','));
    }
    if (newFilters.cities.size > 0) {
      params.set('cities', Array.from(newFilters.cities).join(','));
    }
    
    // Update the URL without causing a page refresh
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [router, searchParams]);

  // Notify parent component when filters change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange?.(filters);
      updateURL(filters);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange, updateURL, debounceMs]);

  // Expansion handlers
  const toggleCountryExpansion = useCallback((country: string) => {
    setExpandedCountries(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(country)) {
        newExpanded.delete(country);
      } else {
        newExpanded.add(country);
      }
      return newExpanded;
    });
  }, []);

  const toggleStateExpansion = useCallback((countryState: string) => {
    setExpandedStates(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(countryState)) {
        newExpanded.delete(countryState);
      } else {
        newExpanded.add(countryState);
      }
      return newExpanded;
    });
  }, []);

  // Filter change handlers
  const handleCountryChange = useCallback((country: string, checked: boolean) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      if (checked) {
        // When checking a country, add the country and ALL its states and cities
        newFilters.countries.add(country);
        const countryData = locationHierarchy?.find(h => h.country === country);
        if (countryData) {
          countryData.states.forEach(stateData => {
            newFilters.states.add(stateData.state);
            stateData.cities.forEach(city => {
              newFilters.cities.add(city);
            });
          });
        }
      } else {
        // When unchecking a country, remove the country and ALL its states and cities
        newFilters.countries.delete(country);
        const countryData = locationHierarchy?.find(h => h.country === country);
        if (countryData) {
          countryData.states.forEach(stateData => {
            newFilters.states.delete(stateData.state);
            stateData.cities.forEach(city => {
              newFilters.cities.delete(city);
            });
          });
        }
      }
      
      return newFilters;
    });
  }, [locationHierarchy]);

  const handleStateChange = useCallback((country: string, state: string, checked: boolean) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      const countryData = locationHierarchy?.find(h => h.country === country);
      const stateData = countryData?.states.find(s => s.state === state);
      
      if (checked) {
        // When checking a state, add the state and ALL its cities
        newFilters.states.add(state);
        if (stateData) {
          stateData.cities.forEach(city => {
            newFilters.cities.add(city);
          });
        }
        
        // Check if all states of this country are now selected
        if (countryData) {
          const allStates = countryData.states.map(s => s.state);
          const selectedStates = allStates.filter(s => newFilters.states.has(s));
          if (selectedStates.length === allStates.length) {
            // All states are selected, so select the country too
            newFilters.countries.add(country);
          }
        }
      } else {
        // When unchecking a state, remove the state and ALL its cities
        newFilters.states.delete(state);
        if (stateData) {
          stateData.cities.forEach(city => {
            newFilters.cities.delete(city);
          });
        }
        
        // Uncheck the country since not all states are selected
        newFilters.countries.delete(country);
      }
      
      return newFilters;
    });
  }, [locationHierarchy]);

  const handleCityChange = useCallback((city: string, checked: boolean) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      // Find the country and state this city belongs to
      const countryData = locationHierarchy?.find(h => 
        h.states.some(s => s.cities.includes(city))
      );
      const stateData = countryData?.states.find(s => s.cities.includes(city));
      
      if (checked) {
        // When checking a city, add the city
        newFilters.cities.add(city);
        
        // Check if all cities of this state are now selected
        if (stateData && countryData) {
          const allCities = stateData.cities;
          const selectedCities = allCities.filter(c => newFilters.cities.has(c));
          if (selectedCities.length === allCities.length) {
            // All cities are selected, so select the state too
            newFilters.states.add(stateData.state);
            
            // Check if all states of this country are now selected
            const allStates = countryData.states.map(s => s.state);
            const selectedStates = allStates.filter(s => newFilters.states.has(s));
            if (selectedStates.length === allStates.length) {
              // All states are selected, so select the country too
              newFilters.countries.add(countryData.country);
            }
          }
        }
      } else {
        // When unchecking a city, remove the city
        newFilters.cities.delete(city);
        
        // Uncheck the state and country since not all cities are selected
        if (stateData && countryData) {
          newFilters.states.delete(stateData.state);
          newFilters.countries.delete(countryData.country);
        }
      }
      
      return newFilters;
    });
  }, [locationHierarchy]);

  // Indeterminate state checkers
  const isCountryIndeterminate = useCallback((country: string) => {
    // If country is fully checked, it's not indeterminate
    if (filters.countries.has(country)) return false;
    
    const countryData = locationHierarchy?.find(h => h.country === country);
    if (!countryData) return false;
    
    // Check if any states or cities from this country are selected
    const hasSelectedStates = countryData.states.some(stateData => filters.states.has(stateData.state));
    const hasSelectedCities = countryData.states.some(stateData => 
      stateData.cities.some(city => filters.cities.has(city))
    );
    
    return hasSelectedStates || hasSelectedCities;
  }, [filters, locationHierarchy]);

  const isStateIndeterminate = useCallback((country: string, state: string) => {
    // If state is fully checked, it's not indeterminate
    if (filters.states.has(state)) return false;
    
    const countryData = locationHierarchy?.find(h => h.country === country);
    const stateData = countryData?.states.find(s => s.state === state);
    if (!stateData) return false;
    
    // Check if any cities from this state are selected
    const selectedCities = stateData.cities.filter(city => filters.cities.has(city));
    
    return selectedCities.length > 0;
  }, [filters, locationHierarchy]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({
      countries: new Set(),
      states: new Set(),
      cities: new Set(),
    });
  }, []);

  // Check if there are active filters
  const hasActiveFilters = filters.countries.size > 0 || filters.states.size > 0 || filters.cities.size > 0;

  // Search functionality
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Filter location hierarchy based on search query
  const filteredLocationHierarchy = (locationHierarchy || []).map(countryData => {
    if (!searchQuery.trim()) return countryData;
    
    const query = searchQuery.toLowerCase();
    const matchesCountry = countryData.country.toLowerCase().includes(query);
    
    const filteredStates = countryData.states.map(stateData => {
      const matchesState = stateData.state.toLowerCase().includes(query);
      const filteredCities = stateData.cities.filter(city => 
        city.toLowerCase().includes(query)
      );
      
      // Include state if it matches or has matching cities
      if (matchesState || filteredCities.length > 0) {
        return {
          ...stateData,
          cities: matchesState ? stateData.cities : filteredCities
        };
      }
      return null;
    }).filter((state): state is NonNullable<typeof state> => state !== null);
    
    // Include country if it matches or has matching states
    if (matchesCountry || filteredStates.length > 0) {
      return {
        ...countryData,
        states: matchesCountry ? countryData.states : filteredStates
      };
    }
    return null;
  }).filter((country): country is NonNullable<typeof country> => country !== null);

  // Auto-expand countries/states when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const newExpandedCountries = new Set<string>();
      const newExpandedStates = new Set<string>();
      
      (locationHierarchy || []).forEach(countryData => {
        const query = searchQuery.toLowerCase();
        const matchesCountry = countryData.country.toLowerCase().includes(query);
        
        const hasMatchingStatesOrCities = countryData.states.some(stateData => {
          const matchesState = stateData.state.toLowerCase().includes(query);
          const hasMatchingCities = stateData.cities.some(city => 
            city.toLowerCase().includes(query)
          );
          return matchesState || hasMatchingCities;
        });
        
        if (matchesCountry || hasMatchingStatesOrCities) {
          newExpandedCountries.add(countryData.country);
          
          countryData.states.forEach(stateData => {
            const matchesState = stateData.state.toLowerCase().includes(query);
            const hasMatchingCities = stateData.cities.some(city => 
              city.toLowerCase().includes(query)
            );
            
            if (matchesState || hasMatchingCities) {
              newExpandedStates.add(`${countryData.country}-${stateData.state}`);
            }
          });
        }
      });
      
      setExpandedCountries(newExpandedCountries);
      setExpandedStates(newExpandedStates);
    }
  }, [searchQuery, locationHierarchy]);

  return {
    // Filter state
    filters,
    setFilters,
    
    // Expansion state
    expandedCountries,
    expandedStates,
    toggleCountryExpansion,
    toggleStateExpansion,
    
    // Search functionality
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredLocationHierarchy,
    
    // Filter handlers
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    
    // Utility functions
    isCountryIndeterminate,
    isStateIndeterminate,
    clearAllFilters,
    hasActiveFilters,
    
    // Loading state
    isLoading,
    
    // URL synchronization
    updateURL,
  };
}
