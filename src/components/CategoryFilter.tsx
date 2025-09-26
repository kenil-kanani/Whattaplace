import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories, CategoryConfig } from '@/config/categories';

interface CategoryFilterProps {
  activeCategory: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const categories = getAllCategories();
  
  const renderCategory = (category: CategoryConfig) => {
    const isActive = activeCategory === category.id;
    return (
      <Link
        key={category.id}
        href={`/${category.id}`}
        className={`flex flex-col items-center cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-105 flex-shrink-0 group ${
          isActive ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 mb-2 sm:mb-3 flex items-center justify-center rounded-2xl transition-all duration-300 ${
          isActive 
            ? 'bg-gray-100/80 shadow-md ring-2 ring-gray-200/50' 
            : 'group-hover:bg-gray-50/60'
        }`}>
          <Image
            src={`/${category.icon}`}
            alt={category.label}
            width={64}
            height={64}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className={`text-xs sm:text-sm lg:text-xs xl:text-sm font-medium text-center leading-tight max-w-[80px] sm:max-w-[90px] lg:max-w-[70px] xl:max-w-[90px] transition-colors duration-300 ${
          isActive ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-700'
        }`}>
          {category.label}
        </span>
      </Link>
    );
  };
  
  return (
    <div className="mb-12 sm:mb-16 md:mb-20">

      <div className="lg:hidden relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        
        <div className="flex gap-6 sm:gap-8 md:gap-12 overflow-x-auto px-4 sm:px-6 justify-start pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(renderCategory)}
        </div>
      </div>
      
      <div className="hidden lg:block px-8 xl:px-12">
        <div className="flex flex-wrap justify-center gap-x-6 xl:gap-x-8 gap-y-6 max-w-7xl mx-auto">
          {categories.map(renderCategory)}
        </div>
      </div>
    </div>
  );
}
