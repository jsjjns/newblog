# XHBlogs Decoupled

一个基于 **Next.js** 的高颜值个人博客分支，保留原 `XHBlogs` 前端 UI 风格，但将内容维护主线改造成 **去后台版（decoupled, content-driven）** 工作流。

这个仓库的主路线不再依赖 `my-blog-manager`、`update.py`、`update.bat` 或“本地控制台 + 写回 GitHub”的双轨同步机制。推荐的维护方式是：

- 直接编辑 `content/` 下的 Markdown / JSON
- 通过 Git 管理内容与配置
- 用标准 Next.js 流程本地开发、构建和部署

---

## Language

- [中文](README.md)
- [English](README_en.md)

---

## 项目定位

这个仓库是原始 XHBlogs 工作流的一个**去后台版整理分支**，目标是：

- 保留原有前端成品感与 UI 设计
- 移除对本地后台控制台的主链依赖
- 将内容统一收敛到 `content/`
- 将内容读取统一收敛到 `XHBlogs/lib/content/*`
- 让部署与维护更接近普通 Next.js 项目

---

## 目录结构

```text
.
├── XHBlogs/                # Next.js 前端应用
│   └── lib/content/        # 内容读取层
├── content/                # 新主线内容源
│   ├── posts/              # 博客文章
│   ├── chatters/           # 杂谈 / 碎片记录
│   ├── moments/            # 说说 / 动态
│   ├── pages/              # 独立页面，如 about.md
│   └── config/             # 运行时可覆盖配置，如 site.json
├── docs/                   # 架构、schema、迁移与交接文档
├── my-blog-manager/        # 旧后台，仅保留作历史参考；不再是推荐工作流
├── picture/                # 历史 README 图片资源
└── scripts/                # 预留给迁移/辅助脚本
```

---

## 当前推荐工作流

### 1. 安装依赖

```bash
cd XHBlogs
npm install
```

### 2. 本地开发

```bash
npm run dev
```

### 3. 生产构建

```bash
npm run build
```

---

## 内容维护方式

### 新文章

路径：`content/posts/*.md`

示例 frontmatter：

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

### 杂谈 / chatter

路径：`content/chatters/*.md`

### 说说 / moments

路径：`content/moments/*.md`

### About 页面

路径：`content/pages/about.md`

### 运行时站点配置

路径：`content/config/site.json`

当前已经支持一部分低风险配置通过 `site.json` 覆盖 `siteConfig.ts` 默认值。

---

## 已完成的去后台化改造

以下页面已经切到新内容层：

- 首页 `app/page.tsx`
- 文章详情 `app/posts/[slug]/page.tsx`
- chatter 列表/详情
- about 页面
- moments 页面
- timeline 页面
- tree / creative workshop 页面

这些页面现在通过：

- `XHBlogs/lib/content/posts.ts`
- `XHBlogs/lib/content/chatters.ts`
- `XHBlogs/lib/content/moments.ts`
- `XHBlogs/lib/content/about.ts`
- `XHBlogs/lib/content/config.ts`

来读取 `content/` 下的数据。

---

## 与原始工作流的区别

这个仓库**不再推荐**以下方式作为主路线：

- 本地控制台作为内容生产入口
- `my-blog-manager` 驱动 GitHub 推送
- Deploy key 写权限同步源码
- `update.py / update.bat` 作为主要更新路径

如果你只是想维护博客内容，推荐直接编辑 Markdown / JSON 并通过 Git 提交。

---

## 兼容状态说明

目前仓库仍保留：

- `my-blog-manager/`

它保留的原因只是：

- 方便比对旧结构
- 保留回退与参考路径
- 避免在去后台化初期过早删除历史资产

`update.py` 与 `update.bat` 已从主仓库移除，因为它们继续暗示旧的管理器驱动更新路径。

**但它们已经不是推荐维护主线。**

---

## 参考文档

- `docs/architecture.md`
- `docs/content-schema.md`
- `docs/coupling-audit.md`
- `docs/decoupling-status.md`
- `docs/handoff-notes.md`

---

## 后续建议

下一步推荐方向：

1. 用真实内容替换当前示例 `content/`
2. 做一次实际部署验证
3. 视情况继续清理 legacy 目录与旧说明
4. 补迁移脚本，把旧内容批量导入新结构

---

## License

沿用仓库当前许可证，详见 `LICENSE`。
