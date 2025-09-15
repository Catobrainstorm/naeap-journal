// types/index.ts

export interface Journal {
  id?: string;
  title: string;
  shortDescription: string;
  downloadLink: string;
  volume: string;
  bookContent: string;
  publishDate: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  priority: 'normal' | 'high' | 'urgent';
  publishDate: string;
  createdAt: string;
  updatedAt?: string;
}

export interface JournalFormData {
  title: string;
  shortDescription: string;
  downloadLink: string;
  volume: string;
  bookContent: string;
  publishDate: string;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  priority: 'normal' | 'high' | 'urgent';
  publishDate: string;
}