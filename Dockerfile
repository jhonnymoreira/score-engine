FROM node:iron-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /score-engine-cli
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN corepack prepare pnpm@9.1.1 --activate
RUN corepack enable pnpm

FROM base AS dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS cli

ARG OPENWEATHER_API_KEY
ENV OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}

COPY --from=dependencies --chown=node:node /score-engine-cli/node_modules /score-engine-cli//node_modules
COPY --chown=node:node . .
ENTRYPOINT [ "pnpm", "tsx", "bin/score-engine-cli.ts" ]
