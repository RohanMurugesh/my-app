# Stage 1: build frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm ci --silent
COPY client/. .
RUN npm run build

# Stage 2: server deps + copy frontend build
FROM node:20-alpine AS build-server
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm ci --silent
COPY server/. .
COPY --from=build-frontend /app/client/build ./client/build

# Final runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build-server /app ./
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "index.js"]
