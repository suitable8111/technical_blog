'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { PostMetadata } from '@/lib/posts';

interface SearchBarProps {
  posts: PostMetadata[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = posts.filter((post) => {
      const searchText = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchText) ||
        post.description.toLowerCase().includes(searchText) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchText)) ||
        post.category.toLowerCase().includes(searchText)
      );
    });

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, posts]);

  const handlePostClick = (slug: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((post) => (
            <button
              key={post.slug}
              onClick={() => handlePostClick(post.slug)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <h3 className="font-semibold text-sm">{post.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {post.description}
              </p>
              <div className="flex gap-2 mt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
