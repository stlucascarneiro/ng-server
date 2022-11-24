FROM node:16

WORKDIR /app
EXPOSE 4000
COPY . .

RUN yarn
RUN yarn build

ENTRYPOINT yarn start