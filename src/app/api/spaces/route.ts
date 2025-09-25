import { NextRequest, NextResponse } from 'next/server';
import spacesData from '@/lib/data/all-locations.json';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
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
