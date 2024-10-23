FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --silent
RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]