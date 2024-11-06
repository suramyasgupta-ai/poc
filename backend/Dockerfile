FROM node:22-bookworm-slim

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

