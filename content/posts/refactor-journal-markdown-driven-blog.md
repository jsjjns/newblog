---
title: "重构纪实：如何将一个高颜值博客剥离成纯净的 Markdown 驱动"
slug: "refactor-journal-markdown-driven-blog"
date: "2026-06-05"
tags: ["Next.js", "折腾", "自托管", "Git"]
category: "Tech"
cover: "/images/covers/refactor-cover.jpg"
summary: "看中了一套极具美感的毛玻璃风格 Next.js 博客 UI，但实在无法忍受其笨重的本地管理后台。于是，我进行了一场‘外科手术’级别的重构。"
draft: false
---

## 缘起：始于颜值，终于工程洁癖

前几天在 GitHub 上闲逛时，偶然发现了一个极具设计感的个人博客项目。它的前端基于 Next.js 和 TypeScript，UI 采用了极具现代感的毛玻璃（Glassmorphism）风格，甚至还自带了丝滑的音乐挂件和打字机特效。

可以说，**在视觉层面上，它完全长在了我的审美上。**

但当我深入研究它的工程结构时，我的“自托管洁癖”犯了：
1. 它强依赖一个叫 `my-blog-manager` 的本地控制台。
2. 内部充斥着 `.bat` 启动脚本、`.py` 更新器，甚至还有硬编码的本地绝对路径。
3. 部署流程不仅漫长，还要求赋予本地后台直接写入 GitHub 的权限。

对于一个习惯了 VPS + Docker + Git 工作流的玩家来说，这种高度耦合的“黑盒”工作流是完全无法接受的。

## 破局：“去骨留皮”的夺舍手术

我想要它的“皮”（高颜值 UI），但必须扔掉它的“骨”（私有工作流）。于是，在 AI Agent 的协助下，我开启了一场暴力的代码剥离计划。

### 1. 物理切割

第一步就是无情地删除了整个 `my-blog-manager` 文件夹，以及所有的 `.bat` 和 `.py` 脚本。让这个仓库回归纯正的 Next.js 前端项目。

### 2. 接管数据源

原先的博客强依赖本地后台去生成和同步数据。我们直接在根目录新建了标准的 `content/` 文件夹：
- `content/posts/` 存放文章
- `content/moments/` 存放动态
- `content/config/` 存放站点配置

通过引入 `gray-matter`，我们手写了 `lib/content/posts.ts` 等一系列数据加载器，**把所有直接读取本地文件系统的硬编码页面，全部重定向到了我们自己的标准 Markdown 目录。**

### 3. 解耦敏感配置

原先那些需要在后台填写的 API Key、Gitalk 评论 Secret，全部被抽离到了 `.env` 环境变量中。配置层也做了优雅的回退机制：如果 `content/config/site.json` 存在，则覆盖默认的 `siteConfig.ts`。

## 尾声：纯净且自由的新形态

经过几轮的报错、排雷（甚至还遇到了 VPS 上 `npm install` 导致 OOM 的小插曲），最终的纯净版博客终于跑通了。

现在的它，是一个**纯粹、轻量、受控**的自托管基础设施：
- **无后台黑盒**：所有文章通过标准的 Frontmatter 定义。
- **极致的工作流**：在本地用 Obsidian 写完 `.md` 笔记，直接 `git push`，服务器拉取后配合 Docker 瞬间完成热更新。
- **配置全解耦**：图床换成了我自己的对象存储，评论系统通过环境变量安全注入。

从今天起，这片自留地正式上线。不被任何框架和黑盒后台绑架，只用最纯粹的 Markdown 记录生活和代码。

*Hello, World. Hello, Freedom.*
