import path from 'path';

export const CONTENT_ROOT = path.resolve(process.cwd(), '..', 'content');

export const CONTENT_DIRS = {
  posts: path.join(CONTENT_ROOT, 'posts'),
  moments: path.join(CONTENT_ROOT, 'moments'),
  chatters: path.join(CONTENT_ROOT, 'chatters'),
  pages: path.join(CONTENT_ROOT, 'pages'),
  config: path.join(CONTENT_ROOT, 'config'),
} as const;
