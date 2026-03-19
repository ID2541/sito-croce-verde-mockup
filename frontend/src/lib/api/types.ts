export type ContentStatus = "DRAFT" | "PUBLISHED";

export type ApiPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string | null;
  publishedAt: string | null;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type ApiService = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  content: string;
  category: string;
  prenotabile: boolean;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiLocation = {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string | null;
  email: string | null;
  hours: string | null;
  notes: string | null;
  mapUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ListResponse<T> = {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type ItemResponse<T> = {
  data: T;
};
