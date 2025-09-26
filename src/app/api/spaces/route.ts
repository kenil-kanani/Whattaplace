import { NextRequest, NextResponse } from 'next/server';
import spacesData from '@/lib/data/all-locations.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Get location filter parameters
    const countries = searchParams.get('countries');
    const states = searchParams.get('states');
    const cities = searchParams.get('cities');
    
    let filteredSpaces = spacesData.locations;
    
    // Filter by category if specified
    if (category && category !== 'all-spaces') {
      const sourceFileMapping: { [key: string]: string[] } = {
        'photoshoot': [
          'best-location-for-photoshoot-near-you.html',
          'best-photoshoot-locations.html'
        ],
        'video-shoot': ['video-shoot-locations.html'],
        'workshops': ['workshops-spaces.html'],
        'podcast': ['podcast-spaces.html'],
        'dance-shoot': ['best-locations-performance-shoots.html'],
        'film-shoot': ['film-shoot-locations.html'],
        'events': ['events-spaces.html'],
        'exhibitions': ['exhibition-spaces.html']
      };
      
      const targetSourceFiles = sourceFileMapping[category];
      if (targetSourceFiles) {
        filteredSpaces = spacesData.locations.filter(location => 
          targetSourceFiles.includes(location.sourceFile)
        );
      }
    }
    
    // Apply location filters if specified
    if (countries || states || cities) {
      const selectedCountries = countries ? countries.split(',').filter(c => c.trim()) : [];
      const selectedStates = states ? states.split(',').filter(s => s.trim()) : [];
      const selectedCities = cities ? cities.split(',').filter(c => c.trim()) : [];
      
      // If any location filters are provided, apply them
      if (selectedCountries.length > 0 || selectedStates.length > 0 || selectedCities.length > 0) {
        filteredSpaces = filteredSpaces.filter((location) => {
          // Use actual location data from the JSON
          const locationCountry = location.country;
          const locationState = location.state;
          const locationCity = location.city;

          // Skip locations without complete location data
          if (!locationCountry || !locationState || !locationCity) {
            return false;
          }

          // Multi-level filtering logic:
          // A location should be shown if it matches ANY of the selected filters at any level
          let matchesFilter = false;
          
          // Check if location matches any selected country
          if (selectedCountries.length > 0 && selectedCountries.includes(locationCountry)) {
            matchesFilter = true;
          }
          
          // Check if location matches any selected state
          if (selectedStates.length > 0 && selectedStates.includes(locationState)) {
            matchesFilter = true;
          }
          
          // Check if location matches any selected city
          if (selectedCities.length > 0 && selectedCities.includes(locationCity)) {
            matchesFilter = true;
          }
          
          return matchesFilter;
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      data: filteredSpaces,
      total: filteredSpaces.length
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch spaces' },
      { status: 500 }
    );
  }
}
