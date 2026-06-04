export type BaseEntry = {
  title: string;
  slug: string;
  date: string;
  tags?: string[];
};

export type PostMeta = BaseEntry & {
  category?: string;
  summary?: string;
  cover?: string;
  draft?: boolean;
};

export type MomentMeta = BaseEntry;
export type ChatterMeta = BaseEntry;

export type MarkdownEntry<TMeta> = {
  meta: TMeta;
  content: string;
};

export type SiteConfig = {
  siteName: string;
  siteDescription: string;
  author: string;
  siteUrl: string;
  socialLinks?: Record<string, string>;
};
