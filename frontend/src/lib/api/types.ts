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

export type ApiFaq = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isFeatured: boolean;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type ApiTransparencyCategoryParent = {
  id: string;
  slug: string;
  title: string;
};

export type ApiTransparencyCategory = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  parentId: string | null;
  parent: ApiTransparencyCategoryParent | null;
  sortOrder: number;
  isActive: boolean;
  publishedItemCount: number;
};

export type ApiTransparencyDocument = {
  id: string;
  label: string;
  fileName: string;
  publicUrl: string;
  mimeType: string;
  fileSizeBytes: number | null;
  checksumSha256?: string | null;
  language?: string | null;
  isPrimary: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiTransparencyItemCategory = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  sortOrder?: number;
  parent?: ApiTransparencyCategoryParent | null;
};

export type ApiTransparencyItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string | null;
  referenceYear: number | null;
  referenceDate: string | null;
  publishedAt: string | null;
  updatedAt: string;
  featured: boolean;
  documentFormat: string;
  sortOrder: number;
  category: ApiTransparencyItemCategory;
  documents: ApiTransparencyDocument[];
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
