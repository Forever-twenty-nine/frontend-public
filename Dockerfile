# Multi-stage Dockerfile for frontend-cursala - Production Build
# Optimized for faster builds and security

FROM node:24-alpine AS base
LABEL environment="production"
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

# Build-time variables (opcionales, se pueden sobrescribir en runtime con docker-compose)
ARG NEXT_PUBLIC_URL_BACK="https://cursala.com.ar/api/v1"
ARG NEXT_PUBLIC_FRONTEND_PRIVATE_URL="https://app.cursala.com.ar"
ARG NEXT_TELEMETRY_DISABLED=1

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
