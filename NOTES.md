## Client

pnpm create next-app --typescript client

pnpm add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 crypto-js react-query axios react-hook-form

pnpm add @types/crypto-js -D

## Server

pnpm add typescript ts-node-dev pino-pretty @types/crypto-js @types/lodash -D

npx tsc --init

pnpm add fastify pino mongoose @typegoose/typegoose argon2 zod fastify-zod @fastify/jwt crypto-js @fastify/cors @fastify/cookie lodash
