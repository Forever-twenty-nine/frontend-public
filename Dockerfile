# Multi-stage Dockerfile for frontend-cursala - Optimized for faster builds
# Build triggered: 2025-11-25

FROM node:24-alpine AS base
LABEL environment="preview"
WORKDIR /app

# Install common build tools (needed for native dependencies like sharp)
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package files first for better caching
COPY package*.json ./

FROM base AS deps-prod
# Install production dependencies only
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

FROM base AS deps-dev
# Install all dependencies (including dev) for building
RUN npm ci --legacy-peer-deps && npm cache clean --force

FROM base AS builder
# Copy all deps from deps-dev stage for building
COPY --from=deps-dev /app/node_modules ./node_modules

# Definir ARGs para variables de build (Next.js las necesita durante npm run build)
ARG NEXT_PUBLIC_URL_BACK
ARG NEXT_PUBLIC_FRONTEND_PRIVATE_URL
ARG NEXT_TELEMETRY_DISABLED

# Convertir ARGs a ENVs para que Next.js las pueda leer durante el build
ENV NEXT_PUBLIC_URL_BACK=$NEXT_PUBLIC_URL_BACK
ENV NEXT_PUBLIC_FRONTEND_PRIVATE_URL=$NEXT_PUBLIC_FRONTEND_PRIVATE_URL
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

# Copy source and build
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy production dependencies
COPY --from=deps-prod /app/node_modules ./node_modules

# Copy built assets only
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Create the static directory that docker-compose expects to mount
RUN mkdir -p /app/dist/src/static

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 80

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:prod"]
