import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CONTENT_DIRS } from './fs';
import type { MarkdownEntry, PostMeta } from './types';

function readMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f: string) => f.endsWith('.md')).sort();
}

export function getAllPosts(): MarkdownEntry<PostMeta>[] {
  return readMarkdownFiles(CONTENT_DIRS.posts)
    .map((fileName: string) => {
      const fullPath = path.join(CONTENT_DIRS.posts, fileName);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      return {
        meta: {
          title: String(data.title ?? 'Untitled'),
          slug: String(data.slug ?? fileName.replace(/\.md$/, '')),
          date: String(data.date ?? '1970-01-01'),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          category: data.category ? String(data.category) : undefined,
          summary: data.summary ? String(data.summary) : undefined,
          cover: data.cover ? String(data.cover) : undefined,
          draft: Boolean(data.draft),
        },
        content,
      };
    })
    .sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));
}

export function getPostBySlug(slug: string): MarkdownEntry<PostMeta> | null {
  return getAllPosts().find((post) => post.meta.slug === slug) ?? null;
}
