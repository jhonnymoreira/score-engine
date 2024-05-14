FROM node:iron-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /score-engine-cli
COPY --chown=node:node . .
RUN corepack prepare pnpm@9.1.1 --activate
RUN corepack enable pnpm

FROM base AS dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dependencies AS build
RUN pnpm build

FROM base AS cli
COPY --from=dependencies --chown=node:node /score-engine-cli/node_modules /score-engine-cli//node_modules
COPY --from=build --chown=node:node /score-engine-cli/dist /score-engine-cli/dist
ENTRYPOINT [ "node", "./dist/index.js" ]
