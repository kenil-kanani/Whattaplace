import { NextRequest, NextResponse } from 'next/server';
import spacesData from '@/lib/data/all-locations.json';
import { getCategorySourceFiles } from '@/config/categories';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Get location filter parameters
    const countries = searchParams.get('countries');
    const states = searchParams.get('states');
    const cities = searchParams.get('cities');
    
    // Get pricing filter parameters
    const priceRanges = searchParams.get('priceRanges');
    
    let filteredSpaces = spacesData.locations;
    
    // Filter by category if specified
    if (category && category !== 'all-spaces') {
      const targetSourceFiles = getCategorySourceFiles(category);
      if (targetSourceFiles.length > 0) {
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
    
    // Apply pricing filters if specified
    if (priceRanges) {
      const selectedPriceRanges = priceRanges.split(',').filter(r => r.trim());
      
      if (selectedPriceRanges.length > 0) {
        filteredSpaces = filteredSpaces.filter((location) => {
          const locationPrice = location.price.amount;
          
          // Check if location matches any of the selected price ranges
          return selectedPriceRanges.some(range => {
            switch (range) {
              case 'under-2000':
                return locationPrice < 2000;
              case '2000-5000':
                return locationPrice >= 2000 && locationPrice <= 5000;
              case '5000-8000':
                return locationPrice >= 5000 && locationPrice <= 8000;
              case '8000-12000':
                return locationPrice >= 8000 && locationPrice <= 12000;
              case 'above-12000':
                return locationPrice > 12000;
              default:
                return false;
            }
          });
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
