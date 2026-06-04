# Content Schema

## Posts

Path: `content/posts/*.md`

```yaml
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
```

## Moments

Path: `content/moments/*.md`

```yaml
---
title: 今天天气不错
slug: moment-2026-06-04
date: 2026-06-04T10:00:00+08:00
tags: [life]
---
```

## Chatters

Path: `content/chatters/*.md`

```yaml
---
title: 一条碎碎念
slug: chatter-2026-06-04
date: 2026-06-04T11:00:00+08:00
tags: [note]
---
```

## About Page

Path: `content/pages/about.md`

Markdown body only, optional frontmatter allowed later if needed.

## Site Config

Path: `content/config/site.json`

```json
{
  "siteName": "YhBlogs Decoupled",
  "siteDescription": "A decoupled glassmorphism blog",
  "author": "Your Name",
  "siteUrl": "https://example.com",
  "socialLinks": {
    "github": "https://github.com/yourname"
  }
}
```
