FROM node:lts as base

WORKDIR /build

RUN yarn global add lerna && yarn config set workspaces-experimental true
# Copying relevant packages
COPY packages/backend ./packages/backend
COPY packages/frontend ./packages/frontend
# Copying required files from root package
COPY package.json yarn.lock .yarnclean lerna.json tsconfig.* ./
# Installing required deps for backend
RUN yarn workspace backend install --prod

FROM base as dev

# Installing dev deps and building the packages
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

# Copying built server and client packages and package.json for scripts
COPY --from=base /build/packages/backend/package.json ./
COPY --from=dev /build/packages/backend/dist/ ./dist/
COPY --from=dev /build/packages/frontend/build/ ./dist/client/
# Only copy non-dev deps
COPY --from=base /build/node_modules/ ./node_modules
