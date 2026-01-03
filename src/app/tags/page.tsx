import Link from 'next/link';
import { getAllTags, getAllPosts } from '@/lib/posts';

export default async function TagsPage() {
  const tags = await getAllTags();
  const allPosts = await getAllPosts();

  const tagCounts = tags.map((tag) => ({
    tag,
    count: allPosts.filter((post) => post.tags.includes(tag)).length,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">All Tags</h1>

      {tags.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            아직 태그가 없습니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group"
            >
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <span className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  #{tag}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({count})
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
