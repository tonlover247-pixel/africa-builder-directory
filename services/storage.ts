
import { Builder, Role, Ecosystem } from '../types';

const STORAGE_KEY = 'africa_builders_db';

const MOCK_DATA: Builder[] = [
  {
    id: '1',
    name: 'Kofi Mensah',
    role: Role.DEVELOPER,
    country: 'Ghana',
    city: 'Accra',
    ecosystem: Ecosystem.SOLANA,
    projectName: 'Sika Protocol',
    bio: 'Building decentralized savings infrastructure for the African unbanked.',
    skills: ['Rust', 'Anchor'],
    website: 'https://example.com',
    twitter: 'kofimensah',
    email: 'kofi@example.com',
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi'
  }
];

export const getBuilders = (): Builder[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
      return MOCK_DATA;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Storage Error:', error);
    return MOCK_DATA;
  }
};

export const saveBuilder = (builder: Omit<Builder, 'id' | 'approved' | 'featured' | 'createdAt'>): Builder => {
  const builders = getBuilders();
  const newBuilder: Builder = {
    ...builder,
    id: crypto.randomUUID(),
    approved: false,
    featured: false,
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(builder.name)}`
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
