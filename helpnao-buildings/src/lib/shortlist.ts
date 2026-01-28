const SHORTLIST_KEY = 'helpnao_shortlist';

export interface ShortlistItem {
  id: string;
  type: 'building' | 'flat';
  addedAt: number;
}

export const getShortlist = (): ShortlistItem[] => {
  try {
    const stored = localStorage.getItem(SHORTLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addToShortlist = (id: string, type: 'building' | 'flat'): ShortlistItem[] => {
  const current = getShortlist();
  if (current.some(item => item.id === id && item.type === type)) {
    return current;
  }
  const updated = [...current, { id, type, addedAt: Date.now() }];
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(updated));
  return updated;
};

export const removeFromShortlist = (id: string, type: 'building' | 'flat'): ShortlistItem[] => {
  const current = getShortlist();
  const updated = current.filter(item => !(item.id === id && item.type === type));
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(updated));
  return updated;
};

export const isInShortlist = (id: string, type: 'building' | 'flat'): boolean => {
  const shortlist = getShortlist();
  return shortlist.some(item => item.id === id && item.type === type);
};

export const toggleShortlist = (id: string, type: 'building' | 'flat'): { isShortlisted: boolean; shortlist: ShortlistItem[] } => {
  if (isInShortlist(id, type)) {
    return { isShortlisted: false, shortlist: removeFromShortlist(id, type) };
  }
  return { isShortlisted: true, shortlist: addToShortlist(id, type) };
};
