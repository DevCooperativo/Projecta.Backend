# =========================
# Stage 1 — Build
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os manifests primeiro (cache de dependências)
COPY ./package*.json .

RUN npm install

# Copia o resto do projeto
COPY . .

# Compila TypeScript
RUN npm run build

# Copia as migrations (.js não são copiados pelo tsc)
RUN cp -r src/infrastructure/data/migrations dist/src/infrastructure/data/migrations


# =========================
# Stage 2 — Runtime
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx sequelize-cli db:migrate --config dist/src/infrastructure/data/sequelize-cli-config.js --migrations-path dist/src/infrastructure/data/migrations && node dist/src/server.js"]
