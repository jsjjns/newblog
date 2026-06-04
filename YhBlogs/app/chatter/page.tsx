import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import ChatterBoard from './ChatterBoard';
import { getAllChatters } from '../../lib/content/chatters';
import { siteConfig } from '@/siteConfig';


export const metadata = {
  title: "杂谈 | "+ siteConfig.title,
  description: "日常碎片与灵感记录",
};

export default function ChatterPage() {
  const chatters = getAllChatters()
    .map((entry) => ({
      slug: entry.meta.slug,
      title: entry.meta.title || '',
      date: entry.meta.date || '未知时间',
      tags: entry.meta.tags || [],
      mood: '',
      cover: '',
      content: entry.content.replace(/^#+ .*\n/m, ''),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen relative pb-10">
      <Navbar />
      <PageTransition>
        {/* 将解析好的数据传递给客户端组件进行瀑布流渲染 */}
        <ChatterBoard chatters={chatters} />
      </PageTransition>
    </div>
  );
}