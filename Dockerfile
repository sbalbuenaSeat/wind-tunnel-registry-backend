# Etapa 1: Construcción
FROM node:22-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --no-frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa 2: Ejecución
FROM node:22-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación con límite de memoria
CMD ["node", "--max-old-space-size=450", "dist/main"]
