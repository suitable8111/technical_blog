import { notFound } from 'next/navigation';
import { getPostBySlugCombined, getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import ResponsiveAdFit from '@/components/ResponsiveAdFit';
import SidebarAds from '@/components/SidebarAds';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugCombined(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Tech Blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugCombined(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:justify-center">
    <article className="mx-auto w-full max-w-3xl lg:mx-0">
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1 font-medium text-white">
            {post.category}
          </span>
          <time className="text-gray-500 dark:text-gray-400">
            {format(new Date(post.date), 'yyyy년 MM월 dd일')}
          </time>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl prose-img:shadow-md">
        {content}
      </div>

      <ResponsiveAdFit />

      <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-white/10">
        <Link
          href="/blog"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>

      <aside className="hidden w-[300px] shrink-0 lg:block">
        <SidebarAds />
      </aside>
    </div>
  );
}
