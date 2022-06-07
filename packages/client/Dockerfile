FROM node:16.15.1
WORKDIR app/
COPY package*.json /app/
RUN npm install
RUN rm node_modules/vueland/postcss.config.js
RUN rm node_modules/vueland/jest.config.js
COPY . /app
RUN npm run build

