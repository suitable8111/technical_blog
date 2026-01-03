import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { format } from 'date-fns';

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
    <div className="space-y-8">
      <div>
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← All tags
        </Link>
        <h1 className="text-4xl font-bold">#{tag}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </h2>
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
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className={`text-xs px-2 py-1 rounded ${
                      t === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                    }`}
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
