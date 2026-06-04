# Decoupled YhBlogs Architecture

## Goal

Extract the `YhBlogs` frontend into a standalone, maintainable Next.js blog that does not depend on `my-blog-manager`, `update.py`, `update.bat`, fixed folder names, or a local Windows-first control console.

## Target Structure

```text
.
├── YhBlogs/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   └── content/
│   ├── public/
│   ├── siteConfig.ts
│   └── package.json
├── content/
│   ├── posts/
│   ├── moments/
│   ├── chatters/
│   ├── pages/
│   └── config/
├── docs/
└── legacy/              # optional later phase for archived manager/update scripts
```

## Content Source Rules

- Posts come from `content/posts/*.md`
- Moments come from `content/moments/*.md`
- Chatters come from `content/chatters/*.md`
- About page comes from `content/pages/about.md`
- Site-level config comes from `content/config/*.json`

## Runtime Rules

- Frontend pages must read via `YhBlogs/lib/content/*`
- No page should read directly from legacy manager paths
- Optional features (comments, AI, music) must fail closed when unconfigured
- The blog must build and run without `my-blog-manager`
