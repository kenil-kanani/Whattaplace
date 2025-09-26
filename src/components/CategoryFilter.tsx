import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories } from '@/config/categories';

interface CategoryFilterProps {
  activeCategory: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const categories = getAllCategories();
  
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
