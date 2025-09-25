import Image from 'next/image';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

interface CategoryNavProps {
  activeCategory: string;
}

const categories: CategoryItem[] = [
  { id: 'all-spaces', label: 'All Spaces', icon: 'all-spaces.svg' },
  { id: 'photoshoot', label: 'Photoshoot', icon: 'photo-shoot.svg' },
  { id: 'video-shoot', label: 'Video Shoot', icon: 'video-shoot.svg' },
  { id: 'workshops', label: 'Workshops', icon: 'workshops.svg' },
  { id: 'podcast', label: 'Podcast', icon: 'podcast.svg' },
  { id: 'dance-shoot', label: 'Dance shoot', icon: 'dance-shoot.svg' },
  { id: 'film-shoot', label: 'Film Shoot', icon: 'film-shoot.svg' },
  { id: 'events', label: 'Events', icon: 'events.svg' },
  { id: 'exhibitions', label: 'Exhibitions', icon: 'exhibitions.svg' },
];

export default function CategoryNav({ activeCategory }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap justify-center gap-12 mb-20">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className={`flex flex-col items-center cursor-pointer transition-all duration-200 hover:opacity-80 ${
              isActive ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <div className="w-16 h-16 mb-3 flex items-center justify-center">
              <Image
                src={`/${category.icon}`}
                alt={category.label}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-600 text-center leading-tight">
              {category.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
