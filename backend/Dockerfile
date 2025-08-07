FROM node:20

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD ["pnpm", "dev"]
