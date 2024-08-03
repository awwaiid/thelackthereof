FROM node:20

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
RUN mkdir -p /docs/music
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "run", "preview" ]
