FROM node:7.7
MAINTAINER "Test CI"
ARG APP_VERSION

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN sed -i "s|::buildnum|$APP_VERSION|g" /server/buildInfo.js

RUN NODE_ENV=prod npm run webpack

CMD npm start
