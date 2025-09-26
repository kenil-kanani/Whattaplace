import { notFound } from 'next/navigation';
import SearchPageHeroSection from '@/components/SearchPageHeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import CategoryPageClient from '@/components/CategoryPageClient';
import { VALID_CATEGORIES, getCategoryTitle, getCategoryDescription, isValidCategory } from '@/config/categories';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  if (!isValidCategory(category)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <SearchPageHeroSection 
          title={getCategoryTitle(category)}
          description={getCategoryDescription(category)}
        />
        <CategoryFilter activeCategory={category} />
        <CategoryPageClient category={category} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}
