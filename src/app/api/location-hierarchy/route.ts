import { NextResponse } from 'next/server';
import spacesData from '@/lib/data/all-locations.json';
import { LocationHierarchy } from '@/types';

export async function GET() {
  try {
    // Generate location hierarchy from the actual location data
    const locationHierarchy: LocationHierarchy[] = generateLocationHierarchy();
    
    return NextResponse.json({
      success: true,
      data: locationHierarchy
    });
  } catch (error) {
    console.error('Location Hierarchy API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate location hierarchy' },
      { status: 500 }
    );
  }
}

function generateLocationHierarchy(): LocationHierarchy[] {
  const hierarchyMap = new Map<string, Map<string, Set<string>>>();
  
  // Process all locations to build the hierarchy
  spacesData.locations.forEach(location => {
    const { country, state, city } = location;
    
    // Skip locations without complete location data
    if (!country || !state || !city) {
      return;
    }
    
    // Initialize country if not exists
    if (!hierarchyMap.has(country)) {
      hierarchyMap.set(country, new Map());
    }
    
    const countryMap = hierarchyMap.get(country)!;
    
    // Initialize state if not exists
    if (!countryMap.has(state)) {
      countryMap.set(state, new Set());
    }
    
    const stateSet = countryMap.get(state)!;
    
    // Add city to the state
    stateSet.add(city);
  });
  
  // Convert the map structure to the expected LocationHierarchy format
  const result: LocationHierarchy[] = [];
  
  hierarchyMap.forEach((statesMap, country) => {
    const states: { state: string; cities: string[] }[] = [];
    
    statesMap.forEach((citiesSet, state) => {
      states.push({
        state,
        cities: Array.from(citiesSet).sort()
      });
    });
    
    // Sort states alphabetically
    states.sort((a, b) => a.state.localeCompare(b.state));
    
    result.push({
      country,
      states
    });
  });
  
  // Sort countries alphabetically
  result.sort((a, b) => a.country.localeCompare(b.country));
  
  return result;
}

// Helper functions that can be used by other parts of the application
export function getAllCountries(hierarchy: LocationHierarchy[]): string[] {
  return hierarchy.map(h => h.country);
}

export function getStatesByCountry(hierarchy: LocationHierarchy[], country: string): string[] {
  const countryData = hierarchy.find(h => h.country === country);
  return countryData ? countryData.states.map(s => s.state) : [];
}

export function getCitiesByState(hierarchy: LocationHierarchy[], country: string, state: string): string[] {
  const countryData = hierarchy.find(h => h.country === country);
  const stateData = countryData?.states.find(s => s.state === state);
  return stateData ? stateData.cities : [];
}

export function getAllCities(hierarchy: LocationHierarchy[]): string[] {
  const cities: string[] = [];
  hierarchy.forEach(country => {
    country.states.forEach(state => {
      cities.push(...state.cities);
    });
  });
  return cities;
}
