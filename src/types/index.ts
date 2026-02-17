export type CampaignLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR';

export type ProductInfo = {
  name: string;
  url: string;
  niche: string;
  language: CampaignLanguage;
  targetAudience?: string;
};

export type AdCopy = {
  headline: string;
  primaryText: string;
  description: string;
  cta: string;
};

export type SalesPageContent = {
  headline: string;
  subheadline: string;
  benefits: string[];
  offer: string;
  socialProof?: string[];
  faq?: { question: string, answer: string }[];
};

export type BonusContent = {
  title: string;
  description: string;
  value: string;
};

export type CampaignStatus = 'draft' | 'pending' | 'published';

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  info: ProductInfo;
  copy: AdCopy;
  salesPage: SalesPageContent;
  createdAt: Date;
};
