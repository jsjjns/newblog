import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import { getAllPosts } from '../../lib/content/posts';
import { siteConfig } from '../../siteConfig';
import TimelineClient from '../../components/TimelineClient';
// 🌟 1. 引入 ToastProvider 喵！
import { ToastProvider } from '../../components/ToastProvider';

export const metadata = {
  title: "归档与探索 | " + siteConfig.title,
};

export default function Timeline() {
  const posts = getAllPosts()
    .filter((post) => !post.meta.draft)
    .map((post) => ({
      slug: post.meta.slug,
      title: post.meta.title || '无标题',
      date: post.meta.date || '1970-01-01',
      description: post.meta.summary || '',
      tags: Array.isArray(post.meta.tags) && post.meta.tags.length > 0 ? post.meta.tags : ['未分类'],
      cover: post.meta.cover || siteConfig.defaultPostCover,
    }));
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  posts.sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return dateDiff !== 0 ? dateDiff : b.slug.localeCompare(a.slug);
  });

  const tagsArray = Object.keys(tagCounts)
    .map(name => ({ name, count: tagCounts[name] }))
    .sort((a, b) => b.count - a.count);

  return (
    // 🌟 2. 在最外层用 ToastProvider 包裹整个页面
    <ToastProvider>
      <div className="min-h-screen relative pb-32">
        <Navbar />
        <PageTransition>
          <TimelineClient posts={posts} tags={tagsArray} />
        </PageTransition>
      </div>
    </ToastProvider>
  );
}