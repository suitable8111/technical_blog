import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default async function Home() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-20 text-center shadow-xl">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="relative">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            매일 자동 큐레이션되는 테크 뉴스
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Tech Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            AI·개발·기술 트렌드를 한곳에서. 매일 새로운 글이 올라옵니다.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            모든 글 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">최신 글</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">가장 최근에 올라온 소식</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            전체 보기 →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">아직 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
