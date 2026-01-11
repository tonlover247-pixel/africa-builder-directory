
import { Builder, Role, Ecosystem } from '../types';

const STORAGE_KEY = 'africa_builders_db';

const MOCK_DATA: Builder[] = [
  {
    id: 'xeus-the-great',
    name: 'Xeus the Great',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.SOLANA,
    projectName: 'Web3 Ecosystem Strategist',
    bio: 'Renowned Web3 personality and visionary ecosystem builder. A leading voice in the Nigerian crypto landscape, driving adoption and education through strategic community leadership.',
    skills: ['Strategy', 'Marketing', 'Ecosystem Building'],
    website: 'https://twitter.com/xeusthegreat',
    twitter: 'xeusthegreat',
    email: 'contact@xeus.com',
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/xeusthegreat'
  },
  {
    id: 'abiodun-sui',
    name: 'Adeniyi Abiodun',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Global',
    ecosystem: Ecosystem.SUI,
    projectName: 'Sui Blockchain (Mysten Labs)',
    bio: 'Nigerian co-founder of global Layer-1 Sui. Adeniyi is a major force in the global blockchain space, showcasing Nigerian excellence in scalable infrastructure technology.',
    skills: ['Blockchain Infra', 'Engineering', 'Product Strategy'],
    website: 'https://sui.io',
    twitter: 'EmanAbio',
    email: 'adeniyi@mystenlabs.com',
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/EmanAbio'
  },
  {
    id: 'ebunayo-web3bridge',
    name: 'Ebunayo (Ebun)',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.ETHEREUM,
    projectName: 'Web3Bridge',
    bio: 'Founder of Web3Bridge, one of Africa’s most impactful Ethereum communities. Pioneering developer training and building the next generation of African blockchain talent.',
    skills: ['Community', 'Education', 'Ethereum'],
    website: 'https://web3bridge.com',
    twitter: 'Ebunayo08',
    email: 'ebun@web3bridge.com',
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/Ebunayo08'
  },
  {
    id: 'harri-obi',
    name: 'Harrison Obiefule (Dr. Harri)',
    role: Role.MARKETER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.SOLANA,
    projectName: 'SuperteamNG',
    bio: 'Lead/Community Builder at SuperteamNG. Driving Solana adoption and building the #2 developer ecosystem in Africa, recognized for its hyper-active and innovative community.',
    skills: ['Growth', 'Community', 'Solana'],
    website: 'https://superteam.fun',
    twitter: 'Harri_obi',
    email: 'harri@superteam.fun',
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/Harri_obi'
  },
  {
    id: 'aronu-xend',
    name: 'Aronu Ugochukwu',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Enugu',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'RWA Asset Chain / Xend Finance',
    bio: 'Founder & CEO of Xend Finance and RWA Asset Chain. A visionary in Real World Assets (RWA) and DeFi, leading the charge for Nigerian innovation on the global stage.',
    skills: ['DeFi', 'RWA', 'Fintech Leadership'],
    website: 'https://assetchain.org',
    twitter: 'AronuUgochukwu',
    email: 'aronu@xend.finance',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/AronuUgochukwu'
  },
  {
    id: 'charis-uglycash',
    name: 'Nkechi Enebeli (Charis)',
    role: Role.DEVELOPER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.BASE,
    projectName: 'UglyCash',
    bio: 'Community Developer and ex-Base Lead Africa. Now scaling UglyCash, a people-first finance platform bridging crypto with everyday financial needs.',
    skills: ['Community Dev', 'Base Ecosystem', 'Fintech'],
    website: 'https://ugly.cash',
    twitter: '__iamcharis',
    email: 'charis@ugly.cash',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/__iamcharis'
  },
  {
    id: 'oluchi-web3ladies',
    name: 'Oluchi Enebeli',
    role: Role.DEVELOPER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.ETHEREUM,
    projectName: 'Web3Ladies',
    bio: 'Early female blockchain engineer and founder of Web3Ladies. Pioneered female participation in African Web3, creating paths for thousands of women developers.',
    skills: ['Engineering', 'Mentorship', 'Solidity'],
    website: 'https://web3ladies.com',
    twitter: 'oluchi_enebeli',
    email: 'oluchi@web3ladies.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/oluchi_enebeli'
  },
  {
    id: 'ruth-bitmama',
    name: 'Ruth Iselema',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'Bitmama',
    bio: 'Co-founder & CEO of Bitmama. A pioneering entrepreneur in the crypto-fiat exchange space, promoting blockchain adoption through practical payment solutions.',
    skills: ['Fintech', 'Entrepreneurship', 'Payments'],
    website: 'https://bitmama.io',
    twitter: 'ruthiselemar',
    email: 'ruth@bitmama.io',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/ruthiselemar'
  },
  {
    id: 'obi-zone',
    name: 'Obi Emetarom',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'Zone',
    bio: 'Founder of Zone, building regulated blockchain infrastructure for financial services. Revolutionizing transaction processing and bank settlements across Africa.',
    skills: ['Infrastructure', 'Fintech', 'Blockchain Banking'],
    website: 'https://zonenetwork.com',
    twitter: 'ObiEmetarom',
    email: 'obi@zonenetwork.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/ObiEmetarom'
  },
  {
    id: 'shola-paystack',
    name: 'Shola Akinlade',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'Paystack',
    bio: 'Co-founder of Paystack (acquired by Stripe). A titan of the Nigerian tech ecosystem whose work in payments laid the groundwork for modern crypto-fiat gateways.',
    skills: ['Payments', 'Engineering', 'Strategic Growth'],
    website: 'https://paystack.com',
    twitter: 'sholaakinlade',
    email: 'shola@paystack.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/sholaakinlade'
  },
  {
    id: 'gb-flutterwave',
    name: 'Olugbenga Agboola',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'Flutterwave',
    bio: 'Co-founder & CEO of Flutterwave. Enabling global payments and stablecoin ramps, scaling African tech to billions of dollars in processing volume.',
    skills: ['Fintech', 'Payments', 'Scaling'],
    website: 'https://flutterwave.com',
    twitter: 'gb_agboola',
    email: 'gb@flutterwave.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/gb_agboola'
  },
  {
    id: 'odun-piggyvest',
    name: 'Odunayo Eweniyi',
    role: Role.FOUNDER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.MULTICHAIN,
    projectName: 'PiggyVest',
    bio: 'Co-founder of PiggyVest. A fintech pioneer in digital savings, inspiring Web3 financial tools with focus on accessible and secure wealth management.',
    skills: ['Fintech', 'Operations', 'Strategy'],
    website: 'https://piggyvest.com',
    twitter: 'odun_eweniyi',
    email: 'odun@piggyvest.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/odun_eweniyi'
  },
  {
    id: 'aj-joke',
    name: 'AJ (Adedamola Joke)',
    role: Role.DESIGNER,
    country: 'Nigeria',
    city: 'Lagos',
    ecosystem: Ecosystem.SOLANA,
    projectName: 'Jup Design Labs',
    bio: 'Founder of Jup Design Labs and Lead at Superteam Designers. Onboarded 200+ designers into Africa’s Web3 design ecosystem.',
    skills: ['UX Design', 'Branding', 'Web3 Design'],
    website: 'https://twitter.com/Adedamolajoke',
    twitter: 'Adedamolajoke',
    email: 'aj@jupdesign.com',
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://unavatar.io/twitter/Adedamolajoke'
  }
];

export const getBuilders = (): Builder[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
      return MOCK_DATA;
    }
    const parsed = JSON.parse(stored);
    
    // Safety check: ensure images are refreshed if handles exist
    return parsed.map((b: Builder) => {
      if (!b.avatarUrl || b.avatarUrl.includes('placeholder')) {
         const handle = b.twitter.replace('@', '').trim();
         return {
           ...b,
           avatarUrl: handle ? `https://unavatar.io/twitter/${handle}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=f97316&color=fff&size=128&bold=true`
         };
      }
      return b;
    });
  } catch (error) {
    console.error('Storage Error:', error);
    return MOCK_DATA;
  }
};

export const saveBuilder = (builder: Omit<Builder, 'id' | 'approved' | 'featured' | 'createdAt'>): Builder => {
  const builders = getBuilders();
  const handle = builder.twitter.replace('@', '').trim();
  const newBuilder: Builder = {
    ...builder,
    id: crypto.randomUUID(),
    approved: false,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: handle ? `https://unavatar.io/twitter/${handle}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(builder.name)}&background=f97316&color=fff&size=128&bold=true`
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...builders, newBuilder]));
  } catch (e) { console.error(e); }
  return newBuilder;
};

export const updateBuilderStatus = (id: string, updates: Partial<Builder>): Builder[] => {
  const builders = getBuilders();
  const updated = builders.map(b => b.id === id ? { ...b, ...updates } : b);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (e) { console.error(e); }
  return updated;
};

export const deleteBuilder = (id: string): Builder[] => {
  const builders = getBuilders();
  const updated = builders.filter(b => b.id !== id);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (e) { console.error(e); }
  return updated;
};
