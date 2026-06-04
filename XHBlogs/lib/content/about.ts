import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { CONTENT_DIRS } from './fs';

export type AboutDocument = {
  cover?: string;
  content: string;
};

export function getAboutDocument(): AboutDocument | null {
  const fullPath = path.join(CONTENT_DIRS.pages, 'about.md');
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return {
    cover: data.cover ? String(data.cover) : undefined,
    content,
  };
}
