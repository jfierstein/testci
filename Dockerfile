FROM node:7.7
MAINTAINER "Test CI"
ARG APP_VERSION
ARG BUILD_ENV

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN NODE_ENV=$BUILD_ENV
RUN sed -i "s|::buildnum|$APP_VERSION|g" /server/buildInfo.js

CMD npm start
