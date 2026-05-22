FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache \
  chromium \
  font-noto \
  poppler-utils \
  py3-lxml \
  py3-matplotlib \
  py3-numpy \
  py3-pillow \
  py3-pip \
  python3 \
  ttf-dejavu \
  && python3 -m pip install --break-system-packages python-docx

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY scripts/dack-report/build_report.py /usr/local/lib/dack-report/build_report.py

RUN printf '#!/usr/bin/env sh\nexec python3 /usr/local/lib/dack-report/build_report.py "$@"\n' > /usr/local/bin/dack-report \
  && chmod +x /usr/local/bin/dack-report

EXPOSE 3000

CMD ["node", "server.js"]
