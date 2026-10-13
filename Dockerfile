# Common build stage
# Node 22: fixes the Node 20 webstreams bug ("transformAlgorithm is not a function")
# triggered by aborted image-optimizer streams.
FROM hub.hamdocker.ir/node:22-alpine as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm config set registry https://repo.hmirror.ir/npm && npm ci

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

# Keep the image optimizer (sharp/libvips) from OOM-killing the pod:
# one libvips worker thread, and a V8 heap cap below the container limit
# so Node GCs under pressure instead of getting SIGKILLed.
ENV SHARP_CONCURRENCY=1
ENV NODE_OPTIONS=--max-old-space-size=768

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

# Call the binaries directly (no `npm run` wrapper) to cut restart downtime;
# Runs migration if available, and starts the production server (supporting Next.js or Vite).
CMD ["sh", "-c", "if [ -f scripts/migrate.ts ]; then node_modules/.bin/tsx scripts/migrate.ts; fi && if [ -f node_modules/.bin/next ]; then node_modules/.bin/next start; else node_modules/.bin/vite preview --port 3000 --host 0.0.0.0; fi"]
