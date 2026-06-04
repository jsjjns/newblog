import fs from 'fs';
import path from 'path';
import { CONTENT_DIRS } from './fs';

export function getPageMarkdown(name: string): string | null {
  const fullPath = path.join(CONTENT_DIRS.pages, `${name}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}
