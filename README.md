# Tech Blog

Next.js와 MDX를 사용하여 만든 현대적인 기술 블로그입니다.

## 주요 기능

- **웹 기반 CMS**: 브라우저에서 직접 포스트 추가/편집/삭제 가능
- **데이터베이스 연동**: PostgreSQL을 사용한 동적 콘텐츠 관리
- **인증 시스템**: NextAuth를 통한 안전한 관리자 로그인
- **다크모드**: 라이트/다크 테마를 자유롭게 전환할 수 있습니다
- **MDX 지원**: 마크다운에서 React 컴포넌트를 사용할 수 있습니다 (MDX 파일 및 DB 모두 지원)
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
- **Prisma**: 타입 안전 ORM
- **PostgreSQL**: 데이터베이스 (Vercel Postgres)
- **NextAuth.js**: 인증 시스템
- **next-themes**: 다크모드 구현
- **Giscus**: GitHub 기반 댓글 시스템

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정하세요:

```bash
cp .env.example .env
```

**로컬 개발 환경:**
- `DATABASE_URL`: PostgreSQL 연결 문자열
- `NEXTAUTH_URL`: `http://localhost:3000`
- `NEXTAUTH_SECRET`: 랜덤 문자열 생성 (`openssl rand -base64 32`)

**Vercel 배포 환경:**
- Vercel Dashboard에서 Postgres 데이터베이스를 생성하면 자동으로 환경 변수가 설정됩니다.

### 3. 데이터베이스 설정

**로컬 개발:**
```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 마이그레이션 (개발 환경)
npm run db:migrate

# 또는 스키마를 DB에 직접 푸시 (프로토타이핑)
npm run db:push
```

**Vercel 배포:**
배포 후 자동으로 Prisma가 설정됩니다. 필요시 Vercel CLI나 Dashboard에서 마이그레이션을 실행할 수 있습니다.

### 4. 관리자 계정 생성

```bash
npm run create-admin
```

기본 계정:
- Email: `admin@example.com`
- Password: `admin123`

환경 변수로 커스터마이징 가능:
```bash
ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npm run create-admin
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어서 결과를 확인하세요.

### 6. 관리자 페이지 접속

- 관리자 로그인: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- 포스트 관리: [http://localhost:3000/admin](http://localhost:3000/admin)

## 블로그 포스트 작성

### 방법 1: 웹 관리자 페이지 (권장)

1. [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)에서 로그인
2. [http://localhost:3000/admin](http://localhost:3000/admin)에서 "새 포스트 작성" 클릭
3. 제목, 설명, 내용(Markdown), 태그, 카테고리 입력
4. "바로 게시하기" 체크박스로 공개 여부 설정
5. 저장 버튼 클릭

### 방법 2: MDX 파일 (기존 방식)

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

3. **Storage 탭에서 Postgres 데이터베이스 생성:**
   - Vercel Dashboard → Storage → Create Database → Postgres
   - 데이터베이스가 생성되면 환경 변수가 자동으로 프로젝트에 연결됩니다

4. **추가 환경 변수 설정:**
   - Settings → Environment Variables에서 다음을 추가:
   ```
   NEXTAUTH_SECRET=생성한_랜덤_문자열
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

5. **데이터베이스 초기화:**
   - 로컬에서 또는 Vercel CLI를 통해:
   ```bash
   # Vercel CLI 설치
   npm i -g vercel

   # 프로젝트와 연결
   vercel link

   # 환경 변수 가져오기
   vercel env pull .env.local

   # 데이터베이스 스키마 푸시
   npm run db:push

   # 관리자 계정 생성
   npm run create-admin
   ```

6. 자동으로 빌드되고 배포됩니다

7. 배포된 사이트에서 `/auth/signin`으로 이동하여 로그인하고 포스트를 관리하세요!

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
