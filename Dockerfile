FROM node:20

# RUN apt-get update
# RUN apt-get install -y libvips42
# RUN apt-get clean

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install
RUN npm install --ignore-scripts=false --foreground-scripts --verbose sharp

# COPY . /app
# RUN mkdir -p /docs/music
# RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 80

# CMD [ "npm", "run", "preview" ]
CMD [ "node", "./server/index.mjs" ]
