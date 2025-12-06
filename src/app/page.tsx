import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tech Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          기술에 대한 생각과 경험을 공유합니다
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            View all posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              아직 포스트가 없습니다. 첫 번째 포스트를 작성해보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <time className="text-sm text-gray-500">
                      {format(new Date(post.date), 'yyyy년 MM월 dd일')}
                    </time>
                    <span className="text-sm text-gray-500">{post.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
