const INQUIRIES_KEY = 'helpnao_inquiries';

export interface Inquiry {
  id: string;
  flatId: string;
  buildingId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  submittedAt: number;
}

export const getInquiries = (): Inquiry[] => {
  try {
    const stored = localStorage.getItem(INQUIRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'submittedAt'>): Inquiry => {
  const current = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: Date.now(),
  };
  const updated = [...current, newInquiry];
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  return newInquiry;
};
