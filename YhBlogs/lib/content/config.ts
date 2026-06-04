import fs from 'fs';
import path from 'path';

import { CONTENT_DIRS } from './fs';
import type { SiteConfig } from './types';
import { siteConfig as defaultSiteConfig } from '../../siteConfig';

export function getSiteConfig(): SiteConfig {
  const fullPath = path.join(CONTENT_DIRS.config, 'site.json');
  if (!fs.existsSync(fullPath)) return defaultSiteConfig as SiteConfig;

  try {
    const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as Partial<SiteConfig>;
    return {
      ...(defaultSiteConfig as SiteConfig),
      ...parsed,
      socialLinks: {
        ...(((defaultSiteConfig as SiteConfig).socialLinks ?? {}) as Record<string, string>),
        ...((parsed.socialLinks ?? {}) as Record<string, string>),
      },
    };
  } catch {
    return defaultSiteConfig as SiteConfig;
  }
}
