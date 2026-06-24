import Link from 'next/link';
import { getAllTags, getAllPosts } from '@/lib/posts';

export default async function TagsPage() {
  const tags = await getAllTags();
  const allPosts = await getAllPosts();

  const tagCounts = tags
    .map((tag) => ({
      tag,
      count: allPosts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
          All Tags
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">총 {tags.length}개의 태그</p>
      </div>

      {tags.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">아직 태그가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-500/40"
            >
              <span className="text-gray-700 transition-colors group-hover:text-indigo-600 dark:text-gray-200 dark:group-hover:text-indigo-400">
                #{tag}
              </span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
