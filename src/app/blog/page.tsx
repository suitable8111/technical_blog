import { Fragment } from 'react';
import { getAllPosts } from '@/lib/posts';
import SearchBar from '@/components/SearchBar';
import PostCard from '@/components/PostCard';
import InFeedAdCard from '@/components/InFeedAdCard';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const adIndex = Math.min(5, posts.length - 1); // 6번째 카드 뒤(없으면 마지막)에 광고

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
            All Posts
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            총 {posts.length}개의 글
          </p>
        </div>
        <SearchBar posts={posts} />
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">아직 포스트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Fragment key={post.slug}>
              <PostCard post={post} />
              {i === adIndex && <InFeedAdCard />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
