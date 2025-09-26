export interface CategoryConfig {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  sourceFiles: string[];
}

export const CATEGORIES_CONFIG: Record<string, CategoryConfig> = {
  'all-spaces': {
    id: 'all-spaces',
    label: 'All Spaces',
    title: 'All Spaces',
    description: 'Discover unique backdrops for Fashion shoots • Product photography • Brand campaigns • Portrait sessions • Lifestyle content • Editorial spreads and more...',
    icon: 'all-spaces.svg',
    sourceFiles: []
  },
  'photoshoot': {
    id: 'photoshoot',
    label: 'Photoshoot',
    title: 'Photoshoot',
    description: 'Discover unique backdrops for Fashion shoots • Product photography • Brand campaigns • Portrait sessions • Lifestyle content • Editorial spreads and more...',
    icon: 'photo-shoot.svg',
    sourceFiles: [
      'best-location-for-photoshoot-near-you.html',
      'best-photoshoot-locations.html'
    ]
  },
  'video-shoot': {
    id: 'video-shoot',
    label: 'Video Shoot',
    title: 'Video Shoot',
    description: 'Professional video production spaces • Content creation studios • Commercial filming locations • Interview setups and more...',
    icon: 'video-shoot.svg',
    sourceFiles: ['video-shoot-locations.html']
  },
  'workshops': {
    id: 'workshops',
    label: 'Workshops',
    title: 'Workshops',
    description: 'Creative learning spaces • Training rooms • Workshop venues • Educational environments and more...',
    icon: 'workshops.svg',
    sourceFiles: ['workshops-spaces.html']
  },
  'podcast': {
    id: 'podcast',
    label: 'Podcast',
    title: 'Podcast',
    description: 'Professional recording studios • Audio production spaces • Interview setups • Podcast-ready environments and more...',
    icon: 'podcast.svg',
    sourceFiles: ['podcast-spaces.html']
  },
  'dance-shoot': {
    id: 'dance-shoot',
    label: 'Dance shoot',
    title: 'Dance Shoot',
    description: 'Dance studios • Movement spaces • Performance venues • Choreography locations and more...',
    icon: 'dance-shoot.svg',
    sourceFiles: ['best-locations-performance-shoots.html']
  },
  'film-shoot': {
    id: 'film-shoot',
    label: 'Film Shoot',
    title: 'Film Shoot',
    description: 'Cinema-quality locations • Movie sets • Professional filming spaces • Cinematic backdrops and more...',
    icon: 'film-shoot.svg',
    sourceFiles: ['film-shoot-locations.html']
  },
  'events': {
    id: 'events',
    label: 'Events',
    title: 'Events',
    description: 'Event venues • Party spaces • Celebration locations • Corporate event spaces and more...',
    icon: 'events.svg',
    sourceFiles: ['events-spaces.html']
  },
  'exhibitions': {
    id: 'exhibitions',
    label: 'Exhibitions',
    title: 'Exhibitions',
    description: 'Gallery spaces • Exhibition venues • Display areas • Art showcase locations and more...',
    icon: 'exhibitions.svg',
    sourceFiles: ['exhibition-spaces.html']
  }
};

export const VALID_CATEGORIES = [
  'all-spaces',
  'photoshoot',
  'video-shoot',
  'workshops',
  'podcast',
  'dance-shoot',
  'film-shoot',
  'events',
  'exhibitions'
] as const;
export type CategoryType = keyof typeof CATEGORIES_CONFIG;

export const getCategoryConfig = (categoryId: string): CategoryConfig | undefined => {
  return CATEGORIES_CONFIG[categoryId];
};

export const getCategoryTitle = (categoryId: string): string => {
  return CATEGORIES_CONFIG[categoryId]?.title || categoryId;
};

export const getCategoryDescription = (categoryId: string): string => {
  return CATEGORIES_CONFIG[categoryId]?.description || '';
};

export const getCategoryIcon = (categoryId: string): string => {
  return CATEGORIES_CONFIG[categoryId]?.icon || '';
};

export const getCategoryLabel = (categoryId: string): string => {
  return CATEGORIES_CONFIG[categoryId]?.label || categoryId;
};

export const getCategorySourceFiles = (categoryId: string): string[] => {
  return CATEGORIES_CONFIG[categoryId]?.sourceFiles || [];
};

export const getAllCategories = (): CategoryConfig[] => {
  return Object.values(CATEGORIES_CONFIG);
};

export const isValidCategory = (categoryId: string): categoryId is CategoryType => {
  return categoryId in CATEGORIES_CONFIG;
};
