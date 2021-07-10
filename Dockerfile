FROM node:lts as base

WORKDIR /build

RUN yarn global add lerna
# Copying relevant packages
COPY packages/backend ./packages/backend
# Copying required files from root package
COPY package.json yarn.lock .yarnclean lerna.json tsconfig.* ./
# Installing deps (Yarn Workspaces will link everything up)
RUN yarn --prod

FROM base as dev

# Installing dev deps and building the package
RUN yarn --ignore-scripts && lerna run build --stream

FROM node:lts-alpine3.12

WORKDIR /app

ARG NODE_ENV=production
ARG PORT=80

# Environment variables for backend
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV DB_PATH=/data/db.sqlite

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]

# Copying built package and package.json for scripts
COPY --from=base /build/packages/backend/package.json ./
COPY --from=dev /build/packages/backend/dist/ ./dist/
# Only copy non-dev deps
COPY --from=base /build/node_modules/ ./node_modules
