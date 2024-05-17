FROM node:lts as build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/infra/server.js"]
