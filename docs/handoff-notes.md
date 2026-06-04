# Handoff Notes — XHBlogs Decoupled Branch

Branch: `refactor/remove-manager`
Working tree root: `/root/work/XinghuisamaBlogs`

## What changed

### Added content architecture
- `content/posts/`
- `content/moments/`
- `content/chatters/`
- `content/pages/`
- `content/config/`
- example content files and starter `site.json`

### Added loader layer
- `XHBlogs/lib/content/fs.ts`
- `XHBlogs/lib/content/types.ts`
- `XHBlogs/lib/content/posts.ts`
- `XHBlogs/lib/content/moments.ts`
- `XHBlogs/lib/content/chatters.ts`
- `XHBlogs/lib/content/pages.ts`
- `XHBlogs/lib/content/about.ts`
- `XHBlogs/lib/content/config.ts`

### Migrated pages
- homepage
- post detail
- chatter list/detail
- about
- moments
- timeline
- tree/creative workshop

### Docs added
- `docs/architecture.md`
- `docs/content-schema.md`
- `docs/coupling-audit.md`
- `docs/decoupling-status.md`

## Verification already done
- `npx tsc --noEmit --pretty false`
- `npm run build`

Both passed on this host after low-memory install strategy.

## What is intentionally not done
- no deletion of `my-blog-manager`
- no large-scale `siteConfig.ts` rewrite
- no semantic redesign of UI
- no production deploy wiring

## Recommended next commit title
`refactor: decouple XHBlogs content layer from my-blog-manager workflow`
