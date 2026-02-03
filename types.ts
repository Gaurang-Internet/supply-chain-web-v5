
export enum ImpactRating {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Entity {
  name: string;
  type: 'COMPANY' | 'PERSON' | 'LOCATION';
}

export interface Article {
  id: string;
  headline: string;
  dek: string;
  body: string;
  timestamp: string;
  source: string;
  impactRating: ImpactRating;
  signalScore: number;
  sectors: string[];
  entities: Entity[];
  whyItMatters: string;
  imageUrl?: string;
  // New ET Analysis fields
  analysisTrigger?: string;
  analysisImpact?: string;
  analysisAudience?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
}

export interface Subscriber {
  id: string;
  name: string;
  initials: string;
  company: string;
  joinedAt: string;
}
