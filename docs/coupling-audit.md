# Frontend–Manager Coupling Audit

## Summary

The `XHBlogs` frontend is already mostly independent from `my-blog-manager` at runtime. Its main coupling is not a direct import from the manager app, but direct filesystem reads from local content directories and direct usage of hard-coded `siteConfig.ts`.

## Keep as-is

- `XHBlogs/app/api/github/route.ts` — GitHub proxy route for Gitalk-like comment flow
- `XHBlogs/app/api/chat/route.ts` — AI route entrypoint (but config should later move behind file/env gating)
- Visual components under `XHBlogs/components/*`
- Markdown rendering stack in `XHBlogs/app/posts/[slug]/page.tsx`

## Needs loader rewrite

### Posts
- `XHBlogs/app/page.tsx`
  - Reads `process.cwd()/posts`
  - Parses frontmatter inline with `gray-matter`
- `XHBlogs/app/posts/[slug]/page.tsx`
  - `generateStaticParams()` reads `process.cwd()/posts`
  - `getPostData(slug)` reads `process.cwd()/posts/${slug}.md`
  - `getRecentPosts()` reads `process.cwd()/posts`

### Chatters
- `XHBlogs/app/page.tsx`
  - Reads `process.cwd()/chatters`
  - Parses files inline

## Site config coupling
- `XHBlogs/app/page.tsx`
- `XHBlogs/app/posts/[slug]/page.tsx`
- `XHBlogs/app/api/chat/route.ts`
- multiple other routes/pages import `siteConfig` directly for metadata and display

This is acceptable for phase 1, but later should become: typed defaults in `siteConfig.ts` + runtime override from `content/config/site.json`.

## No direct runtime manager dependency found yet

Current inspection did **not** show `XHBlogs` importing from:
- `my-blog-manager/`
- `cms_core/`
- `window_config.json`

So the first real decoupling target is content I/O, not code import surgery.

## Phase 1 conclusion

Safe first-phase targets are:
1. Create shared loaders in `XHBlogs/lib/content/*`
2. Replace inline reads in `app/page.tsx`
3. Replace inline reads in `app/posts/[slug]/page.tsx`
4. Leave manager files untouched for now
