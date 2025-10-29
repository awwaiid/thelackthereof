FROM node:20

RUN apt-get update
RUN apt-get install -y libvips-dev
RUN apt-get clean

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json /app/
RUN npm install

# COPY . /app
# RUN mkdir -p /docs/music
# RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "run", "server-start" ]
# CMD [ "node", "./server/index.mjs" ]
