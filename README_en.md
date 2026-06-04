# XHBlogs Decoupled

A **Next.js** personal blog fork that keeps the original `XHBlogs` frontend look and feel, while switching the maintenance workflow to a **decoupled, content-driven** model.

This repository no longer treats `my-blog-manager`, `update.py`, `update.bat`, or the old “local console + push back to GitHub” workflow as the primary path. The recommended workflow is now:

- edit Markdown / JSON directly under `content/`
- manage changes with Git
- develop, build, and deploy with a standard Next.js workflow

---

## Language

- [中文](README.md)
- [English](README_en.md)

---

## Project Positioning

This repository is a decoupled branch of the original XHBlogs workflow, with these goals:

- keep the original frontend UI quality
- remove the local manager from the main content path
- consolidate content under `content/`
- consolidate loading logic under `XHBlogs/lib/content/*`
- make maintenance and deployment feel like a normal Next.js project

---

## Directory Layout

```text
.
├── XHBlogs/                # Next.js frontend app
│   └── lib/content/        # content loader layer
├── content/                # new primary content source
│   ├── posts/              # blog posts
│   ├── chatters/           # chatter / fragment entries
│   ├── moments/            # moments / status entries
│   ├── pages/              # standalone pages, e.g. about.md
│   └── config/             # runtime-overridable config, e.g. site.json
├── docs/                   # architecture, schema, migration, handoff docs
├── my-blog-manager/        # legacy manager, kept only as historical reference
├── picture/                # historical README image assets
└── scripts/                # reserved for migration/helper scripts
```

---

## Recommended Workflow

### 1. Install dependencies

```bash
cd XHBlogs
npm install
```

### 2. Start local development

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## Content Authoring

### Posts

Path: `content/posts/*.md`

Example frontmatter:

```md
---
title: Hello World
slug: hello-world
date: 2026-06-04
tags:
  - nextjs
  - blog
category: Dev
summary: Example post summary
cover: /images/example.jpg
draft: false
---

# Hello World
```

### Chatters

Path: `content/chatters/*.md`

### Moments

Path: `content/moments/*.md`

### About page

Path: `content/pages/about.md`

### Runtime site config

Path: `content/config/site.json`

A subset of low-risk site settings can now override `siteConfig.ts` defaults through `site.json`.

---

## Completed Decoupling Work

These pages have already been migrated to the new content layer:

- homepage `app/page.tsx`
- post detail `app/posts/[slug]/page.tsx`
- chatter list/detail
- about page
- moments page
- timeline page
- tree / creative workshop page

They now read data through:

- `XHBlogs/lib/content/posts.ts`
- `XHBlogs/lib/content/chatters.ts`
- `XHBlogs/lib/content/moments.ts`
- `XHBlogs/lib/content/about.ts`
- `XHBlogs/lib/content/config.ts`

---

## How This Differs From The Original Workflow

This repository no longer recommends these as the main path:

- local console as the primary content entry point
- `my-blog-manager` driving GitHub sync
- deploy-key write access to sync source
- `update.py / update.bat` as the main update mechanism

If you just want to maintain the blog, the recommended path is direct Markdown / JSON editing plus Git.

---

## Compatibility Notes

The repository still keeps:

- `my-blog-manager/`

It remains only to:

- preserve a comparison/reference path
- keep rollback options during the transition
- avoid deleting legacy assets too early

`update.py` and `update.bat` have been removed from the main repository because they continue to imply the old manager-driven update path.

They are **not** the recommended main workflow anymore.

---

## Reference Docs

- `docs/architecture.md`
- `docs/content-schema.md`
- `docs/coupling-audit.md`
- `docs/decoupling-status.md`
- `docs/handoff-notes.md`

---

## Recommended Next Steps

1. replace the example `content/` files with real content
2. verify a real deployment
3. continue cleaning legacy directories/docs when stable
4. add a migration/import script for old content

---

## License

This branch keeps the repository’s current license. See `LICENSE`.
