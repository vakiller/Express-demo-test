FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD npx typeorm migration:run -d './src/database/data-source.js' && node 'src/index.js'