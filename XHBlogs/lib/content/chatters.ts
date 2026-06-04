import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CONTENT_DIRS } from './fs';
import type { ChatterMeta, MarkdownEntry } from './types';

export function getAllChatters(): MarkdownEntry<ChatterMeta>[] {
  if (!fs.existsSync(CONTENT_DIRS.chatters)) return [];
  return fs.readdirSync(CONTENT_DIRS.chatters)
    .filter((f: string) => f.endsWith('.md'))
    .sort()
    .map((fileName: string) => {
      const fullPath = path.join(CONTENT_DIRS.chatters, fileName);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      return {
        meta: {
          title: String(data.title ?? 'Untitled'),
          slug: String(data.slug ?? fileName.replace(/\.md$/, '')),
          date: String(data.date ?? '1970-01-01'),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        },
        content,
      };
    });
}
