import { NextResponse } from 'next/server';
import spacesData from '@/lib/data/all-locations.json';
import { LocationHierarchy } from '@/types';

export async function GET() {
  try {
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
  
  spacesData.locations.forEach(location => {
    const { country, state, city } = location;
    
    if (!country || !state || !city) {
      return;
    }
    
    if (!hierarchyMap.has(country)) {
      hierarchyMap.set(country, new Map());
    }
    
    const countryMap = hierarchyMap.get(country)!;
    
    if (!countryMap.has(state)) {
      countryMap.set(state, new Set());
    }
    
    const stateSet = countryMap.get(state)!;
    
    stateSet.add(city);
  });
  
  const result: LocationHierarchy[] = [];
  
  hierarchyMap.forEach((statesMap, country) => {
    const states: { state: string; cities: string[] }[] = [];
    
    statesMap.forEach((citiesSet, state) => {
      states.push({
        state,
        cities: Array.from(citiesSet).sort()
      });
    });
    
    states.sort((a, b) => a.state.localeCompare(b.state));
    
    result.push({
      country,
      states
    });
  });
  
  result.sort((a, b) => a.country.localeCompare(b.country));
  
  return result;
}

