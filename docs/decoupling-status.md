# Decoupling Status

## Migrated to `lib/content/*`

- `app/page.tsx`
  - posts via `getAllPosts()`
  - chatters via `getAllChatters()`
- `app/posts/[slug]/page.tsx`
  - post detail via `getPostBySlug()` / `getAllPosts()`
- `app/chatter/page.tsx`
  - chatter list via `getAllChatters()`
- `app/chatter/[slug]/page.tsx`
  - chatter detail via `getAllChatters()`
- `app/about/page.tsx`
  - about doc via `getAboutDocument()`
  - activity feed via `getAllPosts()` / `getAllChatters()` / `getAllMoments()`
- `app/moments/page.tsx`
  - moments via `getAllMoments()`
- `app/timeline/page.tsx`
  - posts via `getAllPosts()`
- `app/tree/page.tsx`
  - posts/chatters/moments via `getAllPosts()` / `getAllChatters()` / `getAllMoments()`

## Runtime-config path added

- `lib/content/config.ts`
  - falls back to `siteConfig.ts`
  - overlays values from `content/config/site.json`
- `content/config/site.json`
  - added low-risk runtime-editable fields

## Keep on `siteConfig.ts` for now

These are app/theme/interactive behaviors, not content coupling hot spots. Keeping them in code is the safer surgical choice for this pass:

- `app/layout.tsx`
  - metadata title/description/favicon
  - gradient/background behavior
- `components/Navbar.tsx`
  - navTitle/navSuffix/navAfter
- `components/BackgroundSlider.tsx`
  - bgImages
- `components/DanmakuBackground.tsx`
  - danmakuList
- `components/MusicProvider.tsx`
  - cloudMusicIds
- `components/SiteDashboard.tsx`
  - buildDate/footerBadges/icpConfig
- `app/api/chat/route.ts`
  - geminiConfig
- tree/lab interactive components using
  - `enableLevelSystem`
  - `gitalkConfig`

## Remaining candidates for future runtime-config migration

These are reasonable next targets if you want broader user-editable config, but they are not required to complete decoupling from `my-blog-manager`:

- homepage presentation fields currently reading `siteConfig`
- `ClientSocials.tsx` social links
- friends page `friendLinkApplyFormat`
- page metadata titles for static sections

## Assessment

The heavy coupling that mattered for the decoupling goal was content ingestion, not theme/config cosmetics. That content ingestion path is now largely off the old direct filesystem layout and consolidated behind `lib/content/*`.
