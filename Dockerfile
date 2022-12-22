FROM node:12.19.0-alpine3.9

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
