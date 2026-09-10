FROM node:22-alpine AS build

WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL=/api/v1
ARG VITE_APP_URL=http://localhost:8081
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_URL=${VITE_APP_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
