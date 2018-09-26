FROM node:carbon

WORKDIR /usr/src

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 8000
RUN npm run production