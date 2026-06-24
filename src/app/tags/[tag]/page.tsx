import { Fragment } from 'react';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import InFeedAdCard from '@/components/InFeedAdCard';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return {
    title: `#${tag} | Tech Blog`,
    description: `Posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/tags"
          className="mb-4 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← All tags
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            #{tag}
          </span>
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {posts.length}개의 글
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">이 태그의 글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Fragment key={post.slug}>
              <PostCard post={post} />
              {i === Math.min(5, posts.length - 1) && <InFeedAdCard />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
