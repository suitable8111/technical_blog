# Vercel 배포 가이드

이 가이드는 데이터베이스 연동 블로그를 Vercel에 배포하는 방법을 설명합니다.

## 1. Vercel에 프로젝트 Import

1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 연결 및 `suitable8111/technical_blog` 선택
4. "Import" 클릭

## 2. Postgres 데이터베이스 생성

### Vercel Dashboard에서:

1. 프로젝트 선택
2. **Storage** 탭으로 이동
3. "Create Database" 클릭
4. **Postgres** 선택
5. 데이터베이스 이름 입력 (예: `tech-blog-db`)
6. 리전 선택 (프로젝트와 가까운 곳 선택)
7. "Create" 클릭

데이터베이스가 생성되면 다음 환경 변수가 자동으로 프로젝트에 추가됩니다:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 3. 추가 환경 변수 설정

**Settings** → **Environment Variables**에서 다음을 추가:

### NEXTAUTH_SECRET
```bash
# 로컬에서 생성:
openssl rand -base64 32
```
생성된 문자열을 복사하여 `NEXTAUTH_SECRET` 값으로 입력

### NEXTAUTH_URL
```
https://your-domain.vercel.app
```
(실제 Vercel 도메인으로 교체. 예: `https://technical-blog-mu.vercel.app`)

### 관리자 계정 정보 (선택사항)
```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your-secure-password
```

**중요:** Environment Variables를 추가할 때 "Production", "Preview", "Development" 모두 체크하세요.

## 4. 데이터베이스 스키마 적용

### 방법 1: Vercel CLI 사용 (권장)

```bash
# Vercel CLI 설치 (한 번만)
npm install -g vercel

# 프로젝트와 연결
vercel link

# 환경 변수를 로컬로 가져오기
vercel env pull .env.local

# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 스키마 푸시
npm run db:push

# 관리자 계정 생성
npm run create-admin
```

### 방법 2: Vercel Dashboard 사용

1. **Settings** → **Functions**로 이동
2. **Build Command** 오버라이드:
   ```bash
   npx prisma generate && npx prisma db push && next build
   ```

   ⚠️ 주의: 이 방법은 매 배포마다 실행되므로 프로덕션에는 권장하지 않습니다.

## 5. 재배포

환경 변수를 추가한 후:

1. **Deployments** 탭으로 이동
2. 최신 배포 선택
3. 오른쪽 상단 "..." 메뉴 → "Redeploy" 클릭
4. "Redeploy" 버튼 다시 클릭하여 확인

## 6. 관리자 계정으로 로그인

배포가 완료되면:

1. `https://your-domain.vercel.app/auth/signin`으로 이동
2. 생성한 관리자 이메일과 비밀번호로 로그인
3. `https://your-domain.vercel.app/admin`에서 포스트 관리

## 7. 첫 포스트 작성

1. 관리자 대시보드에서 "새 포스트 작성" 클릭
2. 제목, 설명, 내용 입력
3. 태그와 카테고리 설정
4. "바로 게시하기" 체크
5. "저장" 클릭

포스트가 `https://your-domain.vercel.app/blog/your-slug`에 게시됩니다!

## 문제 해결

### 빌드 오류: "Prisma Client not found"

**해결책:**
1. `package.json`에 `postinstall` 스크립트 추가:
   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```
2. 재배포

### 데이터베이스 연결 오류

**확인사항:**
1. Storage 탭에서 데이터베이스가 프로젝트에 연결되어 있는지 확인
2. Environment Variables에 `POSTGRES_*` 변수들이 모두 있는지 확인
3. `prisma.config.ts`의 `datasource.url` 설정이 올바른지 확인

### NextAuth 세션 오류

**확인사항:**
1. `NEXTAUTH_SECRET` 환경 변수가 설정되어 있는지 확인
2. `NEXTAUTH_URL`이 실제 도메인과 일치하는지 확인
3. 재배포 후 캐시를 지우고 다시 시도

## 유용한 명령어

```bash
# Vercel 로그 확인
vercel logs

# 프로덕션 환경 변수 확인
vercel env ls

# Prisma Studio로 데이터베이스 확인 (로컬)
npm run db:studio
```

## 보안 권장사항

1. ✅ 강력한 `NEXTAUTH_SECRET` 사용
2. ✅ 관리자 비밀번호를 복잡하게 설정
3. ✅ `.env` 파일을 절대 git에 커밋하지 않기
4. ✅ 정기적으로 비밀번호 변경
5. ✅ Vercel의 2FA (Two-Factor Authentication) 활성화

## 추가 기능

### 커스텀 도메인 연결

1. **Settings** → **Domains**로 이동
2. 원하는 도메인 입력
3. DNS 설정 지침 따르기
4. `NEXTAUTH_URL` 환경 변수를 새 도메인으로 업데이트

### 데이터베이스 백업

Vercel Postgres는 자동 백업을 제공합니다.
추가 백업이 필요한 경우:

```bash
# 로컬에서 데이터 덤프
pg_dump $POSTGRES_URL > backup.sql
```

문제가 있으면 [GitHub Issues](https://github.com/suitable8111/technical_blog/issues)에 문의하세요!
