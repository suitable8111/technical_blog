export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">About</h1>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Tech Blog에 오신 것을 환영합니다</h2>

        <p>
          이 블로그는 기술에 대한 생각과 경험을 공유하는 공간입니다.
          소프트웨어 개발, 프로그래밍, 그리고 기술 트렌드에 대한
          다양한 주제를 다룹니다.
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
          <li>다크모드 지원</li>
          <li>태그 및 카테고리 기반 포스트 분류</li>
          <li>검색 기능</li>
          <li>댓글 시스템 (Giscus)</li>
          <li>반응형 디자인</li>
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
  );
}
