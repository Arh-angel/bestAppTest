FROM node:21-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD [ "npm", "run", "start:dev"]