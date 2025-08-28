# 1단계: 빌드
FROM node:21-slim AS builder
WORKDIR /comjeonggosi-web

# 의존성 설치용 파일 복사 및 설치
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# 🔥 .env.local 파일 먼저 복사 (중요!)
COPY .env .env.production

# 전체 소스 복사 및 빌드
COPY . .
RUN pnpm build

# 2단계: 실행
FROM node:21-slim AS runner
WORKDIR /comjeonggosi-web

# 프로덕션 의존성만 설치
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --prod

# 빌드된 파일들 복사
COPY --from=builder /comjeonggosi-web/.next .next
COPY --from=builder /comjeonggosi-web/public public
COPY --from=builder /comjeonggosi-web/next.config.ts ./
COPY --from=builder /comjeonggosi-web/node_modules ./node_modules

# 필요 시 환경파일 복사 (optional, 런타임에서도 필요하면)
COPY --from=builder /comjeonggosi-web/.env .env.production

EXPOSE 3000

CMD ["pnpm", "start"]
