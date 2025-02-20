FROM node:22.13-alpine3.20 AS dev

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn global add @angular/cli@latest

CMD ["ng","serve","--host", "0.0.0.0"]

# Name the node stage "builder"
FROM node:22.13-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# skip chromium download, because of the error `The chromium binary is not available for arm64` error.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

ENV PUPPETEER_EXECUTABLE_PATH="`which chromium`"

# Copy all files from current directory to working dir
COPY . .

RUN apk add --no-cache --virtual .gyp python3 make g++

# install node modules and build assets
RUN corepack enable && yarn && apk del .gyp && yarn run build:prod

RUN ls -al dist

# nginx state for serving content
FROM nginx:1.27-alpine AS prod

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

LABEL org.opencontainers.image.source=https://github.com/bdarge/sb-ui

# Remove default nginx static assets
RUN rm -rf ./* 2> /dev/null

# Copy static assets from builder stage
COPY --from=builder /app/dist .

RUN ls -al

COPY start.sh .

COPY nginx.conf /etc/nginx

EXPOSE 80

CMD [ "sh", "start.sh" ]
