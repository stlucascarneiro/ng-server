FROM node:16-alpine

WORKDIR /app
EXPOSE 4000
COPY . .

RUN yarn install
RUN yarn build

ENTRYPOINT yarn start