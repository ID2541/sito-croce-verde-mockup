export type PostCategory = "news" | "eventi";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  category: PostCategory;
  location?: string;
  audience?: string;
  coverImage?: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: "sanitario" | "sociale" | "trasporto" | "formazione";
  prenotabile: boolean;
  image?: string;
};

export type Location = {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  notes: string;
  image?: string;
};
