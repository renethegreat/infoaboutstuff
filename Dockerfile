# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN echo 'server { listen 8080; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf \
    && chown -R 1001:0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html \
    && chmod -R g+w /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/ || exit 1
USER 1001
CMD ["nginx", "-g", "daemon off;"]
