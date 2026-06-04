import CreativeWorkshopClient from './CreativeWorkshopClient';
import { getAllChatters } from '../../lib/content/chatters';
import { getAllMoments } from '../../lib/content/moments';
import { getAllPosts } from '../../lib/content/posts';

function getLocalItems(directoryName: string, typeName: string) {
  if (directoryName === 'posts') {
    return getAllPosts().map((post) => ({
      id: post.meta.slug,
      slug: post.meta.slug,
      title: post.meta.title || '',
      type: typeName,
      date: post.meta.date || '2026-05-01',
      cover: post.meta.cover || null,
      content: post.content.trim(),
    }));
  }

  if (directoryName === 'chatters') {
    return getAllChatters().map((entry) => ({
      id: entry.meta.slug,
      slug: entry.meta.slug,
      title: entry.meta.title || '',
      type: typeName,
      date: entry.meta.date || '2026-05-01',
      cover: null,
      content: entry.content.trim(),
    }));
  }

  if (directoryName === 'moments') {
    return getAllMoments().map((entry) => ({
      id: entry.meta.slug,
      slug: entry.meta.slug,
      title: entry.meta.title || '',
      type: typeName,
      date: entry.meta.date || '2026-05-01',
      cover: null,
      content: entry.content.trim(),
    }));
  }

  return [];
}

export default function CreativeWorkshopPage() {
  const posts = getLocalItems('posts', 'post');
  const chatters = getLocalItems('chatters', 'chatter');
  const moments = getLocalItems('moments', 'moment');

  return (
    <CreativeWorkshopClient
      posts={posts}
      chatters={chatters}
      moments={moments}
    />
  );
}