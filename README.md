# Tech Blog

Next.js와 MDX를 사용하여 만든 현대적인 기술 블로그입니다.

## 주요 기능

- **다크모드**: 라이트/다크 테마를 자유롭게 전환할 수 있습니다
- **MDX 지원**: 마크다운에서 React 컴포넌트를 사용할 수 있습니다
- **태그 시스템**: 포스트를 태그별로 분류하고 검색할 수 있습니다
- **카테고리**: 포스트를 카테고리로 구분할 수 있습니다
- **검색 기능**: 제목, 설명, 태그로 포스트를 검색할 수 있습니다
- **댓글 시스템**: Giscus를 통한 GitHub 기반 댓글 지원
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험을 제공합니다

## 기술 스택

- **Next.js 16**: React 기반 프레임워크
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **MDX**: 마크다운 + JSX
- **next-themes**: 다크모드 구현
- **Giscus**: GitHub 기반 댓글 시스템

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어서 결과를 확인하세요.

### 3. 블로그 포스트 작성

`posts` 폴더에 `.mdx` 파일을 생성하여 새 포스트를 작성할 수 있습니다.

**포스트 형식 예시:**

```mdx
---
title: "포스트 제목"
date: "2025-12-02"
description: "포스트에 대한 간단한 설명"
tags: ["태그1", "태그2", "태그3"]
category: "카테고리"
---

# 내용 시작

여기에 마크다운 형식으로 내용을 작성하세요.
```

## Giscus 댓글 설정

댓글 기능을 사용하려면 다음 단계를 따르세요:

1. GitHub 저장소의 Settings > General에서 Features 섹션의 Discussions를 활성화합니다
2. [Giscus 웹사이트](https://giscus.app)에 방문하여 저장소를 설정합니다
3. `src/components/Comments.tsx` 파일에서 다음 값들을 업데이트합니다:
   - `data-repo`: 자신의 GitHub 저장소 (예: `username/repo`)
   - `data-repo-id`: Giscus에서 제공하는 repo-id
   - `data-category-id`: Giscus에서 제공하는 category-id

## 프로젝트 구조

```
tech_blog/
├── posts/              # MDX 블로그 포스트
├── public/             # 정적 파일
├── src/
│   ├── app/           # Next.js 앱 라우터
│   │   ├── blog/      # 블로그 페이지
│   │   ├── tags/      # 태그 페이지
│   │   └── about/     # About 페이지
│   ├── components/    # React 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Comments.tsx
│   │   └── ThemeProvider.tsx
│   └── lib/           # 유틸리티 함수
│       └── posts.ts
└── package.json
```

## 배포

### Vercel에 배포 (권장)

1. GitHub에 코드를 푸시합니다
2. [Vercel](https://vercel.com)에 가입하고 프로젝트를 import합니다
3. 자동으로 빌드되고 배포됩니다

### GitHub Pages에 배포

1. `next.config.ts`에 다음을 추가:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   };
   ```

2. GitHub Actions를 사용하여 배포:
   - `.github/workflows/deploy.yml` 파일 생성
   - Next.js 빌드 및 GitHub Pages 배포 설정

### 기타 플랫폼

- **Netlify**: GitHub 저장소 연결 후 자동 배포
- **Cloudflare Pages**: GitHub 연결 및 빌드 명령 설정

## 빌드

```bash
npm run build
```

## 라이센스

MIT

## 문의

GitHub: [@suitable8111](https://github.com/suitable8111)
