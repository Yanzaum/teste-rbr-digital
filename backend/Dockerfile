FROM node:lts as builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm run build

FROM node:lts-slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "start"]