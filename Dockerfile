FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /usr/app

COPY app/package.json .

RUN npm install
