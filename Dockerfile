FROM node:16-bullseye

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

COPY . /app
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]
