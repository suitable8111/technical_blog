export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
        About
      </h1>

      <div className="rounded-2xl border border-gray-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
          <h2>Tech Blog에 오신 것을 환영합니다</h2>

          <p>
            이 블로그는 AI·개발·기술 트렌드 소식을 매일 자동으로 큐레이션해
            공유하는 공간입니다. 새로운 글이 매일 올라옵니다.
          </p>

          <h2>기술 스택</h2>

          <ul>
            <li><strong>Next.js</strong> - React 기반 프레임워크</li>
            <li><strong>TypeScript</strong> - 타입 안정성</li>
            <li><strong>Tailwind CSS</strong> - 유틸리티 기반 CSS</li>
            <li><strong>MDX</strong> - 마크다운 + JSX</li>
          </ul>

          <h2>기능</h2>

          <ul>
            <li>매일 자동 업데이트되는 테크 뉴스</li>
            <li>다크 모드 지원</li>
            <li>태그 및 카테고리 기반 포스트 분류</li>
            <li>검색 기능</li>
            <li>반응형 매거진 카드 디자인</li>
          </ul>

          <h2>연락처</h2>

          <p>
            GitHub:{' '}
            <a
              href="https://github.com/suitable8111"
              target="_blank"
              rel="noopener noreferrer"
            >
              @suitable8111
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
