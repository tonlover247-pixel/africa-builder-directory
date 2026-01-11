
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
  MULTICHAIN = 'Multichain',
  OTHER = 'Other'
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
}
