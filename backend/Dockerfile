FROM node:18-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN if [ -d "/app/commonLib" ]; then \
    cd /app/commonLib && \
    npm ci && \
    npm run build; \
    fi

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]