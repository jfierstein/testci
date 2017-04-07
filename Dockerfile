FROM node:7.7
MAINTAINER "Test CI"

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD npm start
