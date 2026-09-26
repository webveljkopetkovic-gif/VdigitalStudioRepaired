export interface ServiceItem {
  id: string;
  pill: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  image?: string;
  accentColor?: string;
  bgClass?: string;
  textColor?: string;
  logoType?: 'northface' | 'salomon' | 'smarttravel' | 'vans' | 'creative';
  featured?: boolean;
}

export type TypographyPairing = 'curated' | 'editorial' | 'geist';
