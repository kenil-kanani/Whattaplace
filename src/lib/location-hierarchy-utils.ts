import { LocationHierarchy } from '@/types';

// Helper functions for working with location hierarchy data
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
