FROM node:22.13-alpine AS dev

WORKDIR /app

COPY package.json .

RUN yarn global add @angular/cli@latest

CMD ["ng","serve","--host", "0.0.0.0"]

# Name the node stage "builder"
FROM node:22.13-alpine as builder

# Set working directory
WORKDIR /app

# skip chromium download, because of the error `The chromium binary is not available for arm64` error.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

ENV PUPPETEER_EXECUTABLE_PATH="`which chromium`"

# Copy all files from current directory to working dir
COPY . .

# install node modules and build assets
RUN yarn

RUN yarn run build:prod

# nginx state for serving content
FROM nginx:1.27-alpine AS prod

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

LABEL org.opencontainers.image.source=https://github.com/bdarge/sb-ui

# Remove default nginx static assets
RUN rm -rf ./* 2> /dev/null

# Copy static assets from builder stage
COPY --from=builder /app/dist .

COPY start.sh .

EXPOSE 80

CMD [ "sh", "start.sh" ]
