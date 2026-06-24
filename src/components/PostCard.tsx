import Link from 'next/link';
import { format } from 'date-fns';
import type { PostMetadata } from '@/lib/posts';

// 이미지가 없는 글의 폴백 그라데이션 (제목 해시로 결정 → 같은 글은 항상 같은 색)
const GRADIENTS = [
  'from-indigo-500 via-purple-500 to-fuchsia-500',
  'from-violet-600 via-indigo-500 to-sky-500',
  'from-fuchsia-500 via-purple-500 to-indigo-600',
  'from-blue-500 via-indigo-500 to-violet-600',
  'from-purple-600 via-violet-500 to-indigo-500',
];

function pickGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export default function PostCard({ post }: { post: PostMetadata }) {
  const gradient = pickGradient(post.slug || post.title);

  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-500/40">
        {/* 썸네일 */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}>
              <span className="px-4 text-center text-lg font-semibold text-white/95 drop-shadow line-clamp-3">
                {post.title}
              </span>
            </div>
          )}
          {/* 카테고리 배지 */}
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* 본문 */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 line-clamp-2">
            {post.title}
          </h3>
          {post.description && (
            <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
              {post.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <time className="text-xs text-gray-400 dark:text-gray-500">
              {post.date ? format(new Date(post.date), 'yyyy.MM.dd') : ''}
            </time>
            <div className="flex flex-wrap justify-end gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
