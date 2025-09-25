import LocationCard from './LocationCard';
import locationsData from '../lib/data/all-locations.json';

interface Location {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
    period: string;
    fullText: string;
  };
  rating: {
    value: number;
    text: string;
  };
  description: string;
  imageUrl: string;
  imageAlt: string | null;
  detailsLink: string;
}

export default function LocationGrid() {
  const locations = locationsData.locations as Location[];

  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 space-y-6">
          {locations.map((location) => (
            <LocationCard 
              key={location.id} 
              location={location} 
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
