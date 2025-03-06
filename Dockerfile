FROM node:22.14-alpine3.20 AS dev

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g corepack@latest

RUN corepack enable

USER node

WORKDIR /home/node/app

COPY --chown=node . .

RUN pnpm install

CMD pnpm run start

# Name the node stage "builder"
FROM node:22.14-alpine3.20 AS builder

# skip chromium download, because of the error `The chromium binary is not available for arm64` error.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

ENV PUPPETEER_EXECUTABLE_PATH="`which chromium`"

# install node modules and build assets
ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g corepack@latest

RUN corepack enable

# Set working directory
WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build:prod

# nginx state for serving content
FROM nginx:1.27-alpine AS prod

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

LABEL org.opencontainers.image.source=https://github.com/bdarge/sb-ui

# Remove default nginx static assets
RUN rm -rf ./* 2> /dev/null

# Copy static assets from builder stage
COPY --from=builder /app/dist/browser .

COPY start.sh .

COPY nginx.conf /etc/nginx

EXPOSE 80

CMD [ "sh", "start.sh" ]
