import { notFound } from 'next/navigation';
import SearchPageHeroSection from '@/components/SearchPageHeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import CategoryPageClient from '@/components/CategoryPageClient';
import { VALID_CATEGORIES, CategoryType } from '@/types';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}


const categoryTitles: Record<CategoryType, string> = {
  'all-spaces': 'All Spaces',
  'photoshoot': 'Photoshoot',
  'video-shoot': 'Video Shoot',
  'workshops': 'Workshops', 
  'podcast': 'Podcast',
  'dance-shoot': 'Dance Shoot',
  'film-shoot': 'Film Shoot',
  'events': 'Events',
  'exhibitions': 'Exhibitions'
};

const categoryDescriptions: Record<CategoryType, string> = {
  'all-spaces': 'Discover unique backdrops for Fashion shoots • Product photography • Brand campaigns • Portrait sessions • Lifestyle content • Editorial spreads and more...',
  'photoshoot': 'Discover unique backdrops for Fashion shoots • Product photography • Brand campaigns • Portrait sessions • Lifestyle content • Editorial spreads and more...',
  'video-shoot': 'Professional video production spaces • Content creation studios • Commercial filming locations • Interview setups and more...',
  'workshops': 'Creative learning spaces • Training rooms • Workshop venues • Educational environments and more...',
  'podcast': 'Professional recording studios • Audio production spaces • Interview setups • Podcast-ready environments and more...',
  'dance-shoot': 'Dance studios • Movement spaces • Performance venues • Choreography locations and more...',
  'film-shoot': 'Cinema-quality locations • Movie sets • Professional filming spaces • Cinematic backdrops and more...',
  'events': 'Event venues • Party spaces • Celebration locations • Corporate event spaces and more...',
  'exhibitions': 'Gallery spaces • Exhibition venues • Display areas • Art showcase locations and more...'
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  if (!(VALID_CATEGORIES as readonly string[]).includes(category)) {
    notFound();
  }

  const validCategory = category as CategoryType;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <SearchPageHeroSection 
          title={categoryTitles[validCategory]}
          description={categoryDescriptions[validCategory]}
        />
        <CategoryFilter activeCategory={validCategory} />
        <CategoryPageClient category={validCategory} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}
