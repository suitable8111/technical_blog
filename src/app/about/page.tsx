import ResponsiveAdFit from '@/components/ResponsiveAdFit';

export const metadata = {
  title: 'About | Tech Blog',
  description: '매일 자동으로 큐레이션되는 AI·개발·기술 뉴스 블로그 소개와 문의 안내',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
        About
      </h1>

      <div className="rounded-2xl border border-gray-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
          <h2>이 블로그는</h2>
          <p>
            <strong>Tech Blog</strong>는 AI·개발·기술 트렌드에 대한 최신 소식을
            매일 자동으로 모아 한국어로 정리해 전하는 큐레이션 블로그입니다.
            여기저기 흩어진 소식을 한곳에서 빠르게 훑어볼 수 있도록 만드는 것을
            목표로 합니다.
          </p>

          <h2>어떻게 운영되나요</h2>
          <p>
            신뢰할 수 있는 출처의 글을 자동으로 수집하고 핵심 내용을 요약해
            매일 새 글을 발행합니다. 모든 글 하단에는 <strong>원문 링크</strong>를
            함께 제공하므로, 더 깊은 내용은 원문에서 확인하실 수 있습니다.
          </p>

          <h2>다루는 주제</h2>
          <ul>
            <li>AI / 머신러닝 / LLM</li>
            <li>개발 도구와 오픈소스</li>
            <li>스타트업 · 기술 산업 동향</li>
            <li>그 밖의 흥미로운 기술 소식</li>
          </ul>

          <h2>콘텐츠 안내</h2>
          <p>
            게시되는 글은 외부 출처를 요약·정리한 콘텐츠이며, 원문의 저작권은
            각 출처에 있습니다. 내용에 오류가 있거나 게시 중단을 원하시는 경우
            아래 이메일로 알려주시면 신속히 조치하겠습니다.
          </p>

          <h2>문의</h2>
          <p>
            제휴·피드백·정정/삭제 요청 등 모든 문의는 이메일로 보내주세요.
          </p>
          <ul>
            <li>
              이메일:{' '}
              <a href="mailto:suitable8111@gmail.com">suitable8111@gmail.com</a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/suitable8111"
                target="_blank"
                rel="noopener noreferrer"
              >
                @suitable8111
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ResponsiveAdFit />
    </div>
  );
}
