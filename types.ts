
export enum Role {
  FOUNDER = 'Founder',
  DEVELOPER = 'Developer',
  DESIGNER = 'Designer',
  RESEARCHER = 'Researcher',
  MARKETER = 'Marketer',
  OTHER = 'Other'
}

export enum Ecosystem {
  SOLANA = 'Solana',
  ETHEREUM = 'Ethereum',
  BITCOIN = 'Bitcoin',
  SUI = 'Sui',
  BASE = 'Base',
  MULTICHAIN = 'Multichain',
  OTHER = 'Other'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PRO = 'PRO'
}

export interface Builder {
  id: string;
  name: string;
  role: Role;
  country: string;
  city?: string;
  ecosystem: Ecosystem;
  projectName: string;
  bio: string;
  skills: string[];
  website: string;
  twitter: string;
  email: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
  avatarUrl?: string;
  tier?: SubscriptionTier;
}

export interface Investor {
  id: string;
  name: string;
  website: string;
  checkSize: string;
  checkSizeValue: number;
  type: string;
  sectors: string[];
  stage: string[];
  regions: string[];
  isPremium?: boolean;
}
