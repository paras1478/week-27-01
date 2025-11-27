FROM oven/bun:1

WORKDIR /usr/src/app

COPY ./package ./package
COPY .bun.lock ./bun.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.lock

COPY ./apps/backend ./apps/backend

COPY . .

RUN bun install
RUN bun run db:generate

EXPOSE 8081

CMD ["bun", "run","start:websocket"]