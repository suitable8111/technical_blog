'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const commentRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!commentRef.current) return;

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://giscus.app/client.js';
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';

    // Giscus 설정
    scriptElement.setAttribute('data-repo', 'suitable8111/technical_blog'); // 여기에 자신의 레포지토리를 입력하세요
    scriptElement.setAttribute('data-repo-id', ''); // GitHub에서 가져온 repo-id를 입력하세요
    scriptElement.setAttribute('data-category', 'General');
    scriptElement.setAttribute('data-category-id', ''); // GitHub에서 가져온 category-id를 입력하세요
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    scriptElement.setAttribute('data-lang', 'ko');

    commentRef.current.appendChild(scriptElement);

    return () => {
      if (commentRef.current) {
        commentRef.current.innerHTML = '';
      }
    };
  }, [theme, resolvedTheme]);

  return <div ref={commentRef} className="mt-8" />;
}
