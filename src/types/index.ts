export interface Location {
  id: string;
  title: string;
  type: string;
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
  features: string[];
  imageUrl: string;
  imageAlt: string | null;
  detailsLink: string;
  sourceFile: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}

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

export type CategoryType = typeof VALID_CATEGORIES[number];
