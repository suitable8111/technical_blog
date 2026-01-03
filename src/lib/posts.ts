import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { prisma } from './prisma';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  content: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
      content,
    };
  } catch {
    return null;
  }
}

export async function getPostBySlugFromDB(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug, published: true },
    });

    if (!post) return null;

    return {
      slug: post.slug,
      title: post.title,
      date: post.createdAt.toISOString().split('T')[0],
      description: post.description,
      tags: post.tags,
      category: post.category,
      content: post.content,
    };
  } catch (error) {
    console.error('Failed to fetch post from database:', error);
    return null;
  }
}

export async function getPostBySlugCombined(slug: string): Promise<Post | null> {
  // Try database first
  const dbPost = await getPostBySlugFromDB(slug);
  if (dbPost) return dbPost;

  // Fall back to MDX file
  return getPostBySlug(slug);
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  // Get posts from database
  let dbPosts: PostMetadata[] = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: {
        slug: true,
        title: true,
        description: true,
        tags: true,
        category: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    dbPosts = posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      date: post.createdAt.toISOString().split('T')[0],
      description: post.description,
      tags: post.tags,
      category: post.category,
    }));
  } catch (error) {
    console.error('Failed to fetch posts from database:', error);
  }

  // Get posts from MDX files
  const slugs = getPostSlugs();
  const mdxPosts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        description: post.description,
        tags: post.tags,
        category: post.category,
      };
    })
    .filter((post): post is PostMetadata => post !== null);

  // Combine and deduplicate (DB posts take precedence)
  const allPosts = [...dbPosts];
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));

  mdxPosts.forEach((mdxPost) => {
    if (!dbSlugs.has(mdxPost.slug)) {
      allPosts.push(mdxPost);
    }
  });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set<string>();
  allPosts.forEach((post) => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
}
