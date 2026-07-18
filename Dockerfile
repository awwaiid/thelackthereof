# syntax=docker/dockerfile:1.7

# ---- Build stage ----------------------------------------------------------
FROM node:22-slim AS builder

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
       libvips-dev python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci --include=dev

COPY . .

# BuildKit cache mounts persist Nuxt Content's sqlite and Vite's cache across
# builds, so unchanged content is re-used. `.nuxt/` intentionally stays in the
# layer; mounting it confuses Vite's tsconfck resolver.
RUN --mount=type=cache,target=/app/.data,sharing=locked \
    --mount=type=cache,target=/app/node_modules/.cache,sharing=locked \
    npm run build

# ---- Runtime stage --------------------------------------------------------
FROM node:22-slim AS runtime

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
       libvips42 ca-certificates \
  && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
