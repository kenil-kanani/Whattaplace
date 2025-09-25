import Image from 'next/image';
import { AiOutlineStar } from 'react-icons/ai';
import { Location } from '@/types';

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="rounded-4xl max-w-[430px] overflow-hidden hover:bg-platinum transition-all duration-300 cursor-pointer group p-3">

      <div className="relative h-64 w-full rounded-4xl overflow-hidden">
        <Image
          src={location.imageUrl}
          alt={location.imageAlt || `${location.title} - Space for rent`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="mt-3">

        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-black leading-tight flex-1 mr-2">
            {location.title}
          </h3>
          <span className="text-[16px] text-black whitespace-nowrap">
            {location.price.currency} <span className="text-lg font-medium">{location.price.amount}</span> {location.price.period}
          </span>
        </div>
        
        <div className="flex items-center">
          <AiOutlineStar className="w-4 h-4 text-black mr-1" />
          <span className="text-sm text-black">
            {location.rating.text}
          </span>
        </div>
        
        <p className="text-sm font-medium text-gray-medium leading-relaxed">
          {location.features.map((feature, idx) => (
            <span key={feature} className="text-sm font-medium text-gray-medium leading-relaxed">
              {feature}
              {idx !== location.features.length - 1 && (
                <span className="inline-block mx-1 align-middle w-[5px] h-[5px] rounded-full bg-gray-dark"></span>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
